/**
 * Created by 于其先 on 2016/1/22.
 */


var debug = require('debug')('app:config:base')
var path  = require('path')
var fs    =  require('fs-extra')


var config  ={
  env:process.env.NODE_ENV|| 'development',


  //-------------------
  //项目结构
  //-------------------

  dir_proj    :  path.resolve(__dirname,'../'),
  dir_src     :  path.resolve(__dirname,'../src'),
  dir_html    :  path.resolve(__dirname,'../src/static/html'),
  dir_server  :  path.resolve(__dirname,'../server'),
  dir_dist    :  '/dist/',
  dir_styles  :  path.resolve(__dirname,'../src/static'),

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

var dst = path.join(config.dir_proj,config.dir_dist,'styles')


config.copyStyles = function(){
  fs.ensureDir(dst, function (err) {
    if(err){
      console.log('创建styles目录失败');
      return;
    }

    try {
      fs.copySync( config.dir_styles,dst)
    } catch (err) {
      console.error('Oh no, there was an error: ' + err.message)
    }
    debug('复制样式文件功')
  })
}


exports =module.exports = config









