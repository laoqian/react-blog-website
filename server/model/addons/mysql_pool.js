/**
 * Created by gg on 2016/1/12.
 */

var __mysql = require('mysql');


var option ={
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : '3306',
  database : 'rb'
};


function createMysqlPool(options){
  if(!options){
    options = option;
  }

  var pool = __mysql.createPool(options);


  pool.get_model = function get_model(name){
    var model;
    if(name){
      model = require('../'+name+'-model.js');
    }else{
      model = require('../lib/model.js');
    }

    return new model(pool);
  }

  return pool;
}





exports = module.exports = createMysqlPool;