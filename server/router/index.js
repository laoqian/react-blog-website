/**
 * Created by yu on 2016/1/25.
 */


var debug = require('debug')('server:router')
var cheerio = require('cheerio')
var server ={};
var crypto = require('crypto');
var path = require('path')

exports = module.exports = function router_init(app){

  server = app;


  app.get('/',()=>path.join(__dirname,'../static/index.html'));

  app.get('/get_article_list',get_article_list)
  app.get('/home_page_data_get',home_page_data_get)
  app.post('/article_post' ,article_post)
  app.post('/article_get'  ,article_get)
  app.post('/user_login'   ,user_login)
  app.get('/user_logout'   ,user_logout)

}

function get_model(table){
  var pool = server.get('pool')
  return pool.get_model(table);
}


//获取首页数据
function home_page_data_get(req,res){
  var model = get_model('article');
  var data = {status:true,home_page_data:{}};

  var sql = model.order('createtime desc').page('1,20').getSelectSql();
  sql += model.order('skim desc').page('1,10').getSelectSql('title');
  sql += `select count(1) as total from ${model.table};`;

  model.query(sql,(err,rows)=>{
    if(err) return;

    var news = rows[0];
    for(var i=0;i<news.length;i++){
      news[i].createtime = model.date_format(news[i].createtime)
      var $ = cheerio.load(news[i].content);
      news[i].content = $('p').html()+'...';
    }

    data.home_page_data ={recent_tweenty:news,recent_ten_hots:rows[1],article_total:rows[2][0].total};
    res.send(data);
  })
}

//发表文章
function article_post(req,res){
    var user = req.session.user;
    if(!user || !user.username){
      return res.send({status:false,info:'请先登录'});
    }

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


//用户登录
function user_login(req,res){
  var user = req.session.user;
  if(user && user.username){
    return res.send({status:false,info:'不能重复登录'});
  }

  var model = get_model('user');

  if(!req.body.username){
    res.send({status:false,info:"用户名是必须的."})
  }else if(!req.body.password){
    res.send({status:false,info:"密码是必须的."})
  }

  user = {username:req.body.username,password:req.body.password};
  var md5= crypto.createHash('md5');
  md5.update(user.password);
  user.password = md5.digest('hex');

  model.where(`username="${user.username}"`).select(ret=>{
    if(ret.status==true){
      var query = ret.rows[0];
      //登录成功
      if(query.password===user.password){
        delete query.password;
        query.signuptime = model.date_format(query.signuptime);

        //生成session
        req.session.user = query;
        req.session.save(function(err) {
          // session saved
          if(err){
            res.send({status:false,info:"登录操作session失败."});
            return console.log(err);
          }
          debug('保存session成功');
        })
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

  //退出登录
  delete req.session.user;
  req.session.save(function(err) {
    // session saved
    if(err){
      res.send({status:false,info:"退出时操作session失败."});
      return console.log(err);
    }
    debug('保存session成功');
  })

  res.send({status:true,info:'退出登录成功'});
}

















