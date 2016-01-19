var path = require('path');
var express = require('express');

var app = express();

if(app.get('env') !== 'production'){
  var config = require('./webpack.config.dev');
  var webpack = require('webpack');
  var compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    //lazy:true
    stats: {
      colors: true
    },
    watchOptions:{
      aggregateTimeout: 200,
      poll:true
    }
  }));

  app.use(require("webpack-hot-middleware")(compiler, {
    log: console.log
  }));

  console.log('developement');
}else{

  app.use('/static', express.static('static'));
  console.log('production');
}

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'html','index.html'));
});


app.listen(5000, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://localhost:5000');
});
