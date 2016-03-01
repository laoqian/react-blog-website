var path = require('path');
var express = require('express');
var config = require('../config/base.config');

var app = express();
var router_init = require('./router')


var bodyParser = require('body-parser')
var cookieParser  = require('cookie-parser')
var session  = require('express-session')
var parseurl = require('parseurl')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//使用cookie中间件
app.use(cookieParser())

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))

app.use(function (req, res, next) {
  var views = req.session.views

  if (!views) {
    views = req.session.views = {}
  }

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  views[pathname] = (views[pathname] || 0) + 1

  next()
})

///创建连接池
var createMysqlPool = require('./model/addons/mysql_pool');
app.set('pool',createMysqlPool())
app.set('config',config)

if(app.get('env') !== 'production'){
  var webpackConfig = require('../config/webpack.config.js');
  var webpack = require('webpack');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {

    publicPath: webpackConfig.output.publicPath,
    //lazy:true,
    stats: {
      chunks : false,
      chunkModules : false,
      colors : true
    },
    hot:true,
    noInfo: false,
    quiet:false
  }));

  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log
  }));

  config.copyStatic()
}

app.use('/', express.static(path.join(config.dir_proj,config.dir_dist)));
router_init(app)


app.listen(config.server_port, config.server_host, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://${config.server_host}:${config.server_port}`);
});
