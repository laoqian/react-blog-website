/**
 * Created by 于其先 on 2016/1/22.
 */


var debug = require('debug')('app:config:base')
var path  = require('path')



var config  ={
  env:process.env.NODE_ENV|| 'development',


  //-------------------
  //项目结构
  //-------------------

  dir_proj   : path.resolve(__dirname,'../'),
  dir_src    : path.resolve(__dirname,'../src'),
  dir_html    : path.resolve(__dirname,'../src/public/html'),
  dir_server  : path.resolve(__dirname,'../server'),
  dir_dist    : '/dist/',


  //---------------------------------
  //服务器配置
  //---------------------------------
  server_host   :'localhost',
  server_port   :process.env.PORT || 5000
}



//-------------------------------
//环境配置
//-------------------------------

config['__DEV__'] = config.env==='development'
config['__PROD__'] = config.env==='production'


exports =module.exports = config









