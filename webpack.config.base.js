'use strict'

var path = require('path');
var fs = require('fs');


var webpack = require('webpack');

var dir = './src';
var files = fs.readdirSync(dir);
var entry ={};


files.forEach(file=>{
  entry[file.replace(/.js$/,'')] = path.join(__dirname,dir,file);
})

var config ={
  entry,
  output: {
    path: path.join(__dirname, 'dist'),
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
        loader: 'style!css!less'
      }, {
        test: /\.css$/,
        loader: 'style!css'
      },
      {test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  }
};



module.exports  = config;