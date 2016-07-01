/**
 * Created by gg on 2016/1/25.
 */

var fs = require('fs')
var path = require('path')
var debug = require('debug')('server:router')
var server ={};

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

  server = app;
  for(var html in views){
    app.get(`/${html}`,views[html])
  }

  app.use('/get_article_list',get_article_list)
  app.use('/article_post',article_post)
}


function article_post(req,res){
    var pool =server.get('pool');
    var model = pool.get_model('article');
    var artile = req.body;
    artile.author ='老千12345';
    model.add(artile,ret=>{
      console.log(ret.info);
      res.send(ret);
    });
}



function get_article_list(req,res){
  var pool =server.get('pool');
  var model = pool.get_model('article');
  model.select(ret=>{
    res.send(ret);
  });
}