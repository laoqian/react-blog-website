/**
 * Created by gg on 2016/1/22.
 */

'use strict'


var debug = require('debug')('app:config:base')
var path = require('path')
var config = require('./base.config')
var fs = require('fs')
var autoprefixer = require('autoprefixer')
var webpack = require('webpack')
var ExtractTextPlugin = require("extract-text-webpack-plugin")


var __DEV__ = config['__DEV__']
var __PROD__ = config['__PROD__']

var index = [];
index.push(path.join(__dirname,'../src/entry.js'));
var entry ={index};

console.log(entry)

var webpackConfig = {
  entry,
  output: {
    path: path.join(config.dir_proj, config.dir_dist),
    filename: '[name].bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: config.dir_src,
        query: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.json$/,
        loaders: ['json']
      }
    ]
  },

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
};


if (__DEV__) {

  webpackConfig.module.loaders.push({
    test: /\.less$/,
    loader: 'style!css?-url!postcss!less'
  })

  webpackConfig.module.loaders.push({
    test: /\.css/,
    loader: 'style!css?-url!postcss'
  })
} else if (__PROD__) {

  webpackConfig.module.loaders.push({
    test: /\.less$/,
    loader: ExtractTextPlugin.extract('style', `css?-url!postcss!less`)
  })

  webpackConfig.module.loaders.push({
    test: /\.css/,
    loader: ExtractTextPlugin.extract('style', 'css?-url!postcss')
  })
}


webpackConfig.plugins = [
  new webpack.optimize.OccurenceOrderPlugin()
];



if (__DEV__) {
  for (var app in webpackConfig.entry) {
    webpackConfig.entry[app].push('webpack-hot-middleware/client')
  }

  webpackConfig.devtool = 'source-map';
  webpackConfig.output.publicPath = config.dir_public

  webpackConfig.plugins.push(new webpack.NoErrorsPlugin())

  debug('开发环境添加webpack热替换插件')
  webpackConfig.plugins.push(new webpack.HotModuleReplacementPlugin())
} else if (__PROD__) {

  debug('生产环境添加webpack压缩插件')
  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compressor: {
      screw_ie8: true,
      dead_code: true,
      warnings: false
    }
  }))

  //生产环境不编译devtools.js
  webpackConfig.plugins.push(new webpack.IgnorePlugin(/\.\/DevTools.js$/))
}


// File loaders
/* eslint-disable */
webpackConfig.module.loaders.push(
  { test: /\.woff(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg|gif)$/, loader: 'url?limit=8192&name=[path][name].[ext]' }
)
/* eslint-enable */


if (__PROD__) {
  //添加loader将css编译成一个文件
  webpackConfig.plugins.push(new ExtractTextPlugin("[name].bundle.css"))
}

webpackConfig.plugins.push(new webpack.DefinePlugin({
  '__DEV__': config['__DEV__'],
  '__PROD__': config['__PROD__']
}))







exports = module.exports = webpackConfig





















