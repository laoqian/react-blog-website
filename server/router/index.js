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
  //for(var html in views){
  //  app.get(`/${html}`,views[html])
  //}

  app.get('/',views.example);

  app.get('/get_article_list',get_article_list)
  app.post('/article_post',article_post)
  app.post('/article_get',article_get)
}

function get_model(table){
  var pool = server.get('pool')
  return pool.get_model(table);
}

//发表文章
function article_post(req,res){
    var model = get_model('article');
    var artile = req.body;
    artile.author ='老千12345';
    console.log(artile);
    model.add(artile,ret=>{
      console.log(ret.info);
      res.send(ret);
    });
}

//获取文章列表
function get_article_list(req,res){
  var model = get_model('article');
  model.order('createtime desc').page('1,20').select(ret=>{
    for(i=0;i<ret.rows.length;i++){
      ret.rows[i].createtime = model.date_format(ret.rows[i].createtime)
    }

    res.send(ret);
  });
}

//获取文章
function article_get(req,res){
  var model = get_model('article');

  model.where('id='+req.body.article_id).select(ret=>{
    if(ret.status==true){
      var data=ret.rows[0];
      data.skim++;
      data.createtime = model.date_format(data.createtime);
      var set = model.assign_row(data);
      delete set.createtime;
      model.where('id='+data.id).update(set);
    }

    res.send(ret);
  });
}


