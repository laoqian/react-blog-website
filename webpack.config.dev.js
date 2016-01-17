
'use strict'

var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')

var config = Object.create(baseConfig)

config.devtool = 'cheap-module-eval-source-map';
config.entry.client  = 'webpack-hot-middleware/client';
config.plugins =  [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({'process.env': {'NODE_ENV': JSON.stringify('developement'), 'BABEL_ENV': JSON.stringify('developement')}
  })
];


config.output.publicPath= '/static/';

module.exports = config

