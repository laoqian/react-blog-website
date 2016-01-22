var path = require('path');
var express = require('express');
var config = require('../config/base.config');

var app = express();

if(app.get('env') !== 'production'){
  var webpackConfig = require('../config/webpack.config.js');
  var webpack = require('webpack');
  var compiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    //lazy:true
    stats: {
      colors: true
    },
    watchOptions:{
      aggregateTimeout: 1000,
      poll:true
    }
  }));

  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log
  }));

  config.copyStyles()
}

app.use('/dist', express.static(path.join(config.dir_proj,config.dir_dist)));
app.get('/', function(req, res) {
  res.sendFile(path.join(config.dir_html, 'index.html'));
});


app.listen(config.server_port, config.server_host, function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log(`Listening at http://${config.server_host}:${config.server_port}`);
});
