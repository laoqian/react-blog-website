'use strict'

var path = require('path');
var fs = require('fs');


var webpack = require('webpack');
var autoprefixer  = require('autoprefixer');

var dir = './src';
var files = fs.readdirSync(dir);
var entry ={};


files.forEach(file=>{
  entry[file.replace(/.js$/,'')] = [];
  entry[file.replace(/.js$/,'')].push(path.join(__dirname,dir,file));
})

var config ={
  entry,
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].bundle.js',
    chunkFilename: "[name].chunk.js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/,
        include: __dirname
      },{
        test: /\.less$/,
        loader: 'style!css!postcss!less'
      }, {
        test: /\.css$/,
        loader: 'style!css!postcss'
      },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },

  postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ]
};



module.exports  = config;