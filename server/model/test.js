/**
 * Created by yu on 2016/7/1.
 */
var pool = require('./addons/mysql_pool.js')();


var model = pool.get_model('article');

var art ={
  title :'123123',
  content:'hello world!',
  author: 'laoqian123'
}

model.add(art,ret=>(
  console.log(ret)
))
