/**
 * Created by gg on 2016/1/25.
 */

var fs = require('fs')
var path = require('path')
var debug = require('debug')('server:router')
var cheerio = require('cheerio')
var server ={};
var crypto = require('crypto');


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

  app.get('/',views.index);

  app.get('/get_article_list',get_article_list)
  app.get('/home_page_data_get',home_page_data_get)
  app.get('/hot_article_get',hot_article_get)
  app.post('/article_post' ,article_post)
  app.post('/article_get'  ,article_get)
  app.post('/user_login'   ,user_login)
  app.get('/user_logout'   ,user_logout)

}

function get_model(table){
  var pool = server.get('pool')
  return pool.get_model(table);
}


//发表文章
function home_page_data_get(req,res){
  var model = get_model('article');
  var data = {status:true,home_page_data:{}};
  //获取首页文章列表
  model.order('createtime desc').page('1,20').select(ret=>{
    if(ret.status!=true) return;
    for(i=0;i<ret.rows.length;i++){
      ret.rows[i].createtime = model.date_format(ret.rows[i].createtime)
      var $ = cheerio.load(ret.rows[i].content);
      ret.rows[i].content = $('p').html()+'...';
    }
    data.home_page_data.recent_tweenty = ret.rows;

    //查询首页热门文章数量
    model.order('skim desc').page('1,10').select(ret=>{
      if(ret.status!=true) return;
      data.home_page_data.recent_ten_hots = ret.rows;
      //查询文章总记录
      model.query(`select count(1) as total from ${model.table}`,(err,rows)=>{
        if(err) return;
        data.home_page_data.article_total = rows[0].total;
        res.send(data);
      })

    });

  });
}

//发表文章
function article_post(req,res){
    var model = get_model('article');
    var artile = req.body;
    artile.author ='老千12345';
    model.add(artile,ret=>{
      console.log(ret.info);
      res.send(ret);
    });
}

//获取文章列表
function get_article_list(req,res){
  var model = get_model('article');
  model.order('createtime desc').page('1,20').select(ret=>{
    if(ret.status!=true) return;
    for(i=0;i<ret.rows.length;i++){
      ret.rows[i].createtime = model.date_format(ret.rows[i].createtime)
      var $ = cheerio.load(ret.rows[i].content);
      ret.rows[i].content = $('p').html()+'...';
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

//获取热门文章
function hot_article_get(req,res){
  get_model('article').order('skim desc').page('1,10').select(ret=>{res.send(ret);});
}


//用户登录
function user_login(req,res){
  var model = get_model('user');

  if(!req.body.username){
    res.send({status:false,info:"用户名是必须的."})
  }else if(!req.body.password){
    res.send({status:false,info:"密码是必须的."})
  }

  var user = {username:req.body.username,password:req.body.password};
  var md5= crypto.createHash('md5');
  md5.update(user.password);
  user.password = md5.digest('hex');

  model.where(`username="${user.username}"`).select(ret=>{
    if(ret.status==true){
      var query = ret.rows[0];
      if(query.password===user.password){
        delete query.password;
        query.signuptime = model.date_format(query.signuptime);
        res.send({status:true,user:query});
      }else{
        res.send({status:false,info:"密码不正确."});
      }
    }else{
      res.send({status:false,info:"用户名不存在."});
    }
  })
}

//用户退出
function user_logout(req,res){
  res.send({status:true});
}

















