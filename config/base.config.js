/**
 * Created by 于其先 on 2016/1/22.
 */


var debug       = require('debug')('app:config:base')
var path        = require('path')
var fs          =  require('fs-extra')
var fsO       =  require('fs')
var watchpack   = require('watchpack')

//---------项目工程目录---------------------

//数据库配置
var option ={
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : '3306',
  database : 'rb',
  multipleStatements:true //开启多语句同时执行功能
};

var dir ={
  main       : 'src',    //web前端工程主目录,可以任意更改，改目录应放在muyu-cms根目录下
  static     : 'static', //静态文件目录，必须放在main的根目录下
  html       : 'html'    //html文件目录，必须放在static根目录下
}

var config  ={
  env:process.env.NODE_ENV|| 'development',


  //-------------------
  //项目结构
  //-------------------
  dir_server  :  path.resolve(__dirname,'../server'),
  dir_dist    :  'static/',
  dir_public  :  '/',

  //---------------------------------
  //服务器配置
  //---------------------------------
  server_host   :'localhost',
  server_port   :process.env.PORT || 5000,
  //---------------------------------
  //redis启动脚本
  //---------------------------------
   redis_path:'./redis-x64-2.8.2400/'
}


config.sql_option = option

config.dir_proj =  path.resolve(__dirname,'../')
config.dir_src  = path.resolve(config.dir_proj,dir.main)
config.dir_static  = path.resolve(config.dir_src,dir.static)


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


config.watchStatic = function(){
  var wp = new watchpack({
    aggregateTimeout  :1000,
    poll              :true
  })

  var dirs =  []
  var files = []
  fs.walk(config.dir_static)
    .on('data', function (item) {
      var stat = fsO.lstatSync(item.path)
      if(stat.isDirectory()) {
        dirs.push(item.path)
      }else{
        files.push(item.path)
      }
    })

    .on('end', function () {
      console.error(`分析静态文件目录完成`)
      wp.watch(files,dirs,Date.now()-10000)
      console.error(`开始监视静态文件目录`)


      ////显示node内存使用情况
      //var moment = require('moment')
      //
      //moment.locale('zh-cn');
      //var stream  = process.stdout
      //var mem  ={}
      //setInterval(function () {
      //  mem = process.memoryUsage()
      //  stream.clearLine();
      //  stream.cursorTo(0);
      //  stream.write(`${moment().format('MMMM Do YYYY, h:mm:ss a')}--堆外内存(RSS)占用:${(mem.rss/(1024*1024)).toFixed(2)}M`);
      //}, 1000);

      wp.on('change',(filePath,mtime)=>{
        var len = config.dir_static.length
        var Oldpath = filePath.substr(len,filePath.length)
        var newPath = path.join(dst,Oldpath)
        fs.removeSync(newPath)
        var exist = fsO.existsSync(filePath)
        if(!exist){
          return
        }
        console.log('静态文件更改:替换',newPath);
        fs.copySync(filePath,newPath)
      })
    })
    //
    //var child_process = require("child_process");
    //child_process.exec(`start http://${config.server_host}:${config.server_port}`);
}


exports = module.exports = config









