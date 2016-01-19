'use strict'

var webpack = require('webpack')
var baseConfig = require('./webpack.config.base')

var config = baseConfig


config.plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
      'BABEL_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      warnings: false
    }
  })//, new webpack.optimize.CommonsChunkPlugin({name:'commons',filename:'commons.js'})
];


//config.resolve={}
//config.resolve.alias={
//  react:"node_modules/react/dist/react.min.js"
//}
//config.externals={
//  'react':'window.React'
//}


module.exports = config

