/**
 * Created by gg on 2016/1/25.
 */

var fs = require('fs')
var path = require('path')
var debug = require('debug')('server:router')


function import_view(dir_path){
  var files  = fs.readdirSync(dir_path)
  var views = {}

  files.forEach(file=>{
    var stat = fs.lstatSync(path.join(dir_path,file))
    if(stat.isDirectory()){
      var sub = import_view(path.join(dir_path,file))
      views = object.assign(views,sub)
      return;
    }

    var reg = /.html$/
    if(!file.match(reg)){
      return;
    }

    var key  = file.replace(reg,'')
    views[key] = path.join(dir_path,file)
  })

  return views
}


function reactViewsGet(dir){
  var views =import_view(dir)

  function renderReactHtml(html){
    return function (req,res){
      res.sendFile(html)
    }
  }
  for(var key in views){
    views[key] = renderReactHtml(views[key])
  }

  return views
}


exports = module.exports = function router_init(app){
  var config  = app.get('config')
  var views = reactViewsGet(config.dir_html)
  
  for(var html in views){
    app.get(`/${html}`,views[html])
  }

  app.use('/userchange',user_change)
  app.use('/article_post',article_post)
}


function article_post(req,res){
   console.log(req.body);
}



function user_change(req,res){
  console.log('user_change')
  res.send({data:'hello'})
}