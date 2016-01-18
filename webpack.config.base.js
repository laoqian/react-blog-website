'use strict'

var path = require('path');
var fs = require('fs');


var webpack = require('webpack');
var autoprefixer  = require('autoprefixer');




var entry ={};



var srcPath = path.join(__dirname,'src');
var dirs = fs.readdirSync(srcPath);

dirs.forEach(dir=>{
  var stat = fs.lstatSync(path.join(srcPath,dir))
  if(!stat.isDirectory()) {
    return;
  }

  var files=fs.readdirSync(path.join(srcPath,dir))
  files.forEach(file=>{
    var reg = /.entry.js$/
    if(!file.match(reg)){
      return;
    }

    var key  = file.replace(reg,'');
    entry[key]= [];
    entry[key].push(path.join(srcPath,dir,file));
  })
})

var config ={
  entry,
  output: {
    path: path.join(__dirname, 'static'),
    filename: '[name].bundle.js',
    chunkFilename: "[name].chunk.js"
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