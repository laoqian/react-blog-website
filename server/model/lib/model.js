
var EventEmitter = require("events").EventEmitter;
var debug = require('debug')('model');
var validate_rule = require('./validate-rule');


function Model(pool){
  EventEmitter.call(this);

  if(!pool){
    var error  = new Error('mysql pool handle is none');
    throw error;
  }

  this.pool = pool;

  this.rules = {};
  this.data  = {};
  this.valid_data  = {};
  this.sqlObj = {};

  for(var key in validate_rule){
    validate_rule[key] = validate_rule[key].bind(this);
  }

  this.ruleCall = validate_rule;
  this.serialEvents= [];
  this.busy = false; //模型忙标志
}


Model.prototype = Object.create(EventEmitter.prototype);

Model.prototype.addSerialEvent = function(type,cb){
  var len = this.serialEvents.length;
  var serial = {},event = {};


  serial.data = this.data;
  serial.valid_data = this.valid_data;
  serial.sqlObj = this.sqlObj;

  this.clearOldProps();

  event.serial = serial;
  event.type = type;
  event.cb = cb;

  this.serialEvents[len] = event;

  if(this.serialEvents.length == 1 && this.busy == false){
    this.busy = true;
    this.serialEventRun(this.serialEvents[0]);
  }
};

Model.prototype.getNextSerialEvent = function(){
  this.serialEvents = this.serialEvents.slice(1,this.serialEvents.length);
  return this.serialEvents[0];
};


Model.prototype.serialEventRun = function(serialEvent){

  switch(serialEvent.type) {
    case 'create':
     return this.__create(serialEvent);
    case    'add':
      return this.__add(serialEvent);
    case 'update':
      return this.__update(serialEvent);
    case 'select':
      return this.__select(serialEvent);
    case 'delete':
      return this.__delete(serialEvent);
    default :
      throw  new Error(`serial event error :${serialEvent.event}`);
  }
}


Model.prototype.serialcallback = function(serialEvent,result){
  if(typeof serialEvent.cb === 'function')
    serialEvent.cb(result);
  else
    debug(result.info);

  var nextEvent = this.getNextSerialEvent();
  if(typeof nextEvent == 'object'){
    return this.serialEventRun(nextEvent);
  }

  this.busy = false;
}


/***************************************************************************************************
* 使用异步的方法一个接一个的校验数据的有效性,该验证方法为同步方式，只要有一个数据验证失败，立即报错.
* req.data ：需要校验的数据对象键值对数组,req.data[i].key = 数据库字段 ,req.data[i].value = 字段当前值
* req.rules：当前的所有验证规则
* req.cur_data_pos：当前验证数据在req.data中的数据下标
* req.cur_rule_pos:当前校验的数据的所有规则在req.cur_rule数组中的索引
* req.cur_rule：当前验证数据的所有验证规则,为数据
* req.cur_data：当前验证的数据键值对对象
*
***************************************************************************************************/

Model.prototype.dataVarifyOneByOne = function(event,callback){
  callback = callback.bind(this);
  if(!this.data){
    return callback(`${this.table} 没有数据可以校验`);
  }

  var req = { data:obj_to_arr(event.serial.data),
              rules:rules_format(this.rules),
              cur_data_pos:0 ,
              cur_rule_pos:-1,
              error:0,
              event
            };

  req.throw_error = function(error){
    if(!error)
      req.error = req.cur_rule[req.cur_rule_pos][1];
    else
      req.error = error;
  };

  ((function next (){
    if(req.error){
      return callback({status:false,info:req.error});
    }

    req.cur_data = req.data[req.cur_data_pos];
    req.cur_rule = req.rules[req.cur_data.key];

    if(!req.cur_rule || (req.cur_rule_pos+1)>=req.cur_rule.length){
      event.serial.valid_data[req.cur_data.key] = req.cur_data.value;
      req.cur_rule_pos =  -1;
      if(++req.cur_data_pos>=req.data.length){
        return callback({status:true,info:'校验成功',data:event.serial.valid_data});
      }

      return (next.bind(this))();
    }

    if((req.cur_rule_pos+1)<req.cur_rule.length){
      req.cur_rule_pos++ ;
    }

    var call_api = this.ruleCall[req.cur_rule[req.cur_rule_pos][0]];
    if(call_api){
      return call_api(req,next.bind(this));
    }

    callback({status:true,info:'校验成功',data:event.serial.valid_data});
  }).bind(this))()
};

Model.prototype.validation = function(event){
  return new Promise((resolve,reject)=>{
    this.error = undefined;

    var ret = dataRequireCheck(event.serial.data,this.rules);
    if(ret != true){
      return reject(ret);
    }

    this.dataVarifyOneByOne(event,result=>{
      if(result.status===false){
        return reject(result.info);
      }

      resolve(result);
    });
  });
};



Model.prototype.create = function(post,cb){
  this.data = post_parse(post);
  if(!this.data){
    return cb({status:false,info:'解析post参数失败'});
  }

  this.addSerialEvent('create',cb);
};

Model.prototype.__create = function(event){

    this.validation(event).then((event,result)=>{
      this.serialcallback(event, {status:true,data:event.serial.valid_data});
    }).catch(err=>this.serialcallback(event,err));

};

Model.prototype.add = function(data,cb){
  if(typeof data === 'object'){
    this.data = data;
  }

  if(typeof data === 'function'){
    return this.addSerialEvent('add',data);
  }

  this.addSerialEvent('add',cb);
}


Model.prototype.__add =function(event){
  debug(event);
  this.validation(event)
    .then((result)=>{
    if (isObjEmpty(event.serial.valid_data)) {
      return this.serialcallback({status:true,info:'没有可用的数据'});
    }

    var sql =createMysqlInsertString(this.table,event.serial.valid_data);
    this.query(sql, (err, rows, field)=>{
      if(err){
        return this.serialcallback(event,{status:false, info:'插入失败',sqlinfo:{err,rows,field}});
      }
      this.serialcallback(event,{status:true,info:'插入成功', sqlinfo:{err,rows,field}});
    });
  })
    .catch(err=>{
      this.serialcallback(event,err)});
}


Model.prototype.update = function(data,cb){

  if(typeof data === 'object'){
    this.data = data;
  }

  if(typeof data === 'function'){
    return this.addSerialEvent('update',data);
  }

  this.addSerialEvent('update',cb);
}


Model.prototype.__update  = function(event){
    if (isObjEmpty(event.serial.data)) {
      return this.serialcallback(event,{status:true,info:'没有可用的数据'});
    }
    var sql =createMysqlUpdateString(this.table,event.serial.data,event.serial.sqlObj.where)

    this.query(sql, (err, rows, field)=>{

      if(err){
        return this.serialcallback(event,{status:false, info:'更新失败',sqlinfo:{err,rows,field}});
      }
      this.serialcallback(event,{status:true,info:'更新成功', sqlinfo:{err,rows,field}});

    });
};


Model.prototype.where = function(str){
  this.sqlObj.where = str;
  return this;
};
Model.prototype.page = function(str){
  this.sqlObj.page = str;
  return this;
}
Model.prototype.order = function(str){
  this.sqlObj.order = str;
  return this;
}
Model.prototype.limit = function(str){
  this.sqlObj.limit = str;
  return this;
}


Model.prototype.select = function(col,cb){
  if(typeof col ==-'string'){
    this.sqlObj.select = col;
  }else{
    this.sqlObj.select = '*';
  }

  if(typeof col=== 'function'){
    return this.addSerialEvent('select',col);
  }

  this.addSerialEvent('select',cb);
}

Model.prototype.__select = function(event){
  var sql = createMysqlSelectString(this.table,event.serial.sqlObj);

  this.query(sql, (err, rows, field)=>{

    if(err){
      return this.serialcallback(event,{status:false, info:'查询失败',err});
    }

    this.serialcallback(event,{status:true,info:'查询成功', rows});
  });

}

Model.prototype.delete = function (cb){
  this.addSerialEvent('delete',cb);
}

Model.prototype.__delete = function(event){
  var sql = createMysqlDeleteString(this.table,event.serial.sqlObj.where);

  this.query(sql, (err, rows, field)=>{
    if(err){
      return this.serialcallback(event,{status:false, info:'删除失败',err});
    }

    this.serialcallback(event,{status:true,info:'删除成功'});
  });
}


Model.prototype.query = function(sql,values,cb){
  return this.pool.query(sql,values,cb);
}

Model.prototype.clearOldProps = function(){
  this.data = {};
  this.valid_data = {};
  this.sqlObj ={};
}
///////////////////////////mysql pool 序列化操作////////////////////////

exports = module.exports = Model;


function createMysqlSelectString(table,sqlObj){
  var sql ='';

  sql = `select ${sqlObj.select} from ${table}`;
  if(typeof sqlObj.where ==='string'){
    sql += ` where ${where}`;
  }

  if(typeof sqlObj.order ==='string'){
    sql+=` order by ${sqlObj.order}`;
  }

  if(typeof  sqlObj.page ==='string'){
    var arg = sqlObj.page.split(',');
    var page = (parseInt(arg[0])-1)*parseInt(arg[1]);
    var per_page_num = arg[1];

    sql+=` limit ${page},${per_page_num}`;
  }else if(typeof sqlObj.limit ==='number' ||typeof sqlObj.limit ==='string'){
    sql+=` limit  ${sqlObj.limit}`;
  }

  debug(sql);
  return sql;
}



function createMysqlUpdateString(table,data,where){
  var sql ='';
  for(var key in data){
    sql+=`${key}='${data[key]}',`;
  }

  sql = sql.substr(0,sql.length-1);

  sql = `update ${table} set ${sql}`;
  if(typeof where ==='string'){
    sql +=` where ${where}`;
  }

  debug(sql);
  return sql;
}


function createMysqlInsertString(table,data){
  var names ='',values='';
  for(var key in data){
    names+=`${key},`;
    values+=`'${data[key]}',`;
  }

  //去掉最后的逗号
  names = names.substr(0,names.length-1);
  values = values.substr(0,values.length-1);

  var sql = `insert into ${table}(${names}) values(${values})`;
  debug(sql);
  return sql;
}

function createMysqlDeleteString(table,where){
  var sql = `delete from ${table} `;

  if(where){
    sql +=` where ${where}`;
  }

  debug(sql);
  return sql;
}



function dataRequireCheck(data,rules){
  for(var key in rules){
    var item = rules[key];
    for(var i=0;i<item.length;i++){
      var ikey = item[i][0];
      if(ikey ==='require' && data[key] == undefined){
        return item[i][1];
      }
    }
  }

  return true;
}

function obj_to_arr(obj){
  var ret =[],i=0;

  for(var key in obj){
    ret[i] ={};
    ret[i].key = key;
    ret[i++].value = obj[key];
  }
  return ret;
}


function isObjEmpty(obj){
  for(var key in obj){
    return false;
  }
  return true;
}


function rules_format(rules){
  var new_rules ={}, form= [];
  for(var key in rules ){

    if(!Array.isArray(rules[key][0])){
      new_rules[key] = [];
      new_rules[key][0] = rules[key];
    }else{
      new_rules[key] = rules[key];
    }
  }

  return  new_rules;
}
