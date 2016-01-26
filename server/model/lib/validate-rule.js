/**
 * Created by gg on 2016/1/11.
 */

var debug = require('debug')('rules');


exports['unique'] = function(req,next){

  debug(req.cur_data.key,'---validate--unique');

  var str  =`select * from ${this.table} where ${req.cur_data.key}=${req.cur_data.value}`;

  debug(str);

  this.query(str,(err,rows,field)=>{
    if(err){
      req.throw_error( `数据库错误-->${err.stack}`);
    }

    if(rows && rows.length>0){
      req.throw_error();
    }

    next();
  });

};

exports['length'] = function(req,next){

  debug(req.cur_data.key,'---validate--length');

  var rule = req.cur_rule[req.cur_rule_pos];

  var ret = false;
  var str = rule[2].split(',');
  if(str.length == 2){
    if(req.cur_data.value.length<=parseInt(str[1]) && req.cur_data.value.length>=parseInt(str[0])){
      ret = true;
    }
  }else{
     if(req.cur_data.value.length ==parseInt(str[0])){
       ret =true;
     }
  }

  if(ret==false){
    req.throw_error();
  }

  next();
};

exports['require'] = function(req,next){

  debug(req.cur_data.key,'---validate--require');

  if(req.cur_data.value == undefined){
    req.throw_error();
  }

  next();
};


exports['equal'] = function(req,next){
  debug(req.cur_data.key,' ---validate--equal');

  if(req.cur_data.value != this.data[req.cur_rule[req.cur_rule_pos][2]] ){
    req.throw_error();
  }

  next();
};


exports['regex'] = function(req,next){
  debug(req.cur_data.key,' ---validate--type');

  var regex = req.cur_rule[req.cur_rule_pos][2];

  if(req.cur_data.value.match(regex)!=null){
    req.throw_error();
  }

  next();
};