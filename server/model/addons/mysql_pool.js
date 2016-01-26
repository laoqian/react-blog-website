/**
 * Created by gg on 2016/1/12.
 */

var __mysql = require('mysql');


var option ={
  host     : 'localhost',
  user     : 'root',
  password : '',
  port     : '3306',
  database : 'eb'
};


function createMysqlPool(options){
  if(!options){
    options = option;
  }

  return __mysql.createPool(options);
}


exports = module.exports = createMysqlPool;