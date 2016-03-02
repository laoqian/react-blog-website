var path = require('path');
var express = require('express');
var config = require('../config/base.config');

var app = express();
var router_init = require('./router')


var bodyParser = require('body-parser')
var cookieParser  = require('cookie-parser')
var session  = require('express-session')
var parseurl = require('parseurl')
var RedisStore = require('connect-redis')(session)
var debug = require('debug')('server')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//使用cookie中间件
app.use(cookieParser())
app.use(session({
  name:'ZUSESSIONID',
  secret: '88199',
  resave: false,
  saveUninitialized: true,
  //store: new RedisStore({
  //  host:'127.0.0.1',
  //  port:'6379'
  //}),
  cookie:{
    maxAge:5000 //超时时间
  }
}))


var set_ses = require('./middlewares/setCookie')
app.use(set_ses)


///创建连接池
var createMysqlPool = require('./model/addons/mysql_pool');
app.set('pool',createMysqlPool(config.sql_option))
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
