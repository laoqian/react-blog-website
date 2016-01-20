
'use strict'

var webpack = require('webpack')
var config = require('./webpack.config.base')



for(var app in config.entry){
  config.entry[app].push('webpack-hot-middleware/client')
}

config.devtool = 'cheap-module-eval-source-map';
config.plugins =  [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('development'),
      'BABEL_ENV': JSON.stringify('development')
    }
  })//,new webpack.optimize.CommonsChunkPlugin({name:'commons',filename:'commons.js'})
];

config.output.publicPath= '/static/';

module.exports = config

