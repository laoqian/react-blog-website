/**
 * Created by 于其先 on 2016/1/22.
 */


var debug = require('debug')('app:config:base')
var path  = require('path')
var fs    =  require('fs-extra')


//---------项目工程目录---------------------

//数据库配置
var option ={
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : '3306',
  database : 'eb'
};

var dir ={
  main       : 'example',    //web前端工程主目录,可以任意更改，改目录应放在muyu-cms根目录下
  static     : 'static', //静态文件目录，必须放在main的根目录下
  html       : 'html'    //html文件目录，必须放在static根目录下
}

var config  ={
  env:process.env.NODE_ENV|| 'development',


  //-------------------
  //项目结构
  //-------------------
  dir_server  :  path.resolve(__dirname,'../server'),
  dir_dist    :  'dist/',
  dir_public  :  '/',

  //---------------------------------
  //服务器配置
  //---------------------------------
  server_host   :'localhost',
  server_port   :process.env.PORT || 5000
}


config.sql_option = option

config.dir_proj =  path.resolve(__dirname,'../')
config.dir_src  = path.resolve(config.dir_proj,dir.main)
config.dir_static  = path.resolve(config.dir_src,dir.static)
config.dir_html  = path.resolve(config.dir_static,dir.html)
config.dir_html_dist = path.resolve(__dirname,'../',config.dir_dist,dir.static,dir.html)


//-------------------------------
//环境配置
//-------------------------------

config['__DEV__'] = config.env==='development'
config['__PROD__'] = config.env==='production'

var dst = path.join(config.dir_proj,config.dir_dist)


config.copyStatic = function(){
  fs.ensureDir(dst, function (err) {
    if(err){
      console.log('创建静态文件目录失败');
      return;
    }

    try {
      fs.copySync( config.dir_static,dst)
    } catch (err) {
      console.error('Oh no, there was an error: ' + err.message)
    }
    debug('复制静态文件成功')
  })
}


exports =module.exports = config









