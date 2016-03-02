/**
 * Created by gg on 2016/3/2.
 */
var path = require("path");
var fs   = require("fs")
var webpack = require('webpack')

var entry =[];
var files=fs.readdirSync(path.join(__dirname,'js'))

files.forEach(file=>{
  var reg = /.js$/
  if(!file.match(reg)){
    return;
  }

  var key  = file.replace(reg,'');
  entry.push(path.join(__dirname,'js',file));
})

module.exports = {
  entry,
  output: {
    path: path.join(__dirname, './'),
    filename: 'vender.bundle.js'
  },
  plugins:[
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ],
  //module: {
  //  loaders: [
  //    {
  //      test: /\.js$/,
  //      loaders: [ 'babel' ]
  //    }
  //  ]
  //}
};
