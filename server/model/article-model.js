/**
 * Created by gg on 2016/1/10.
 */

var model = require('./lib/model');

function article_model(pool){
  model.call(this,pool);

  this.table = 'rb_article';

  this.rules = {
                  title:  [['require', '标题是必须的'], ['length', '栏目名长度不正确！', '5,100']],
                  content:[['require', '内容是必须的'], ['length', '内容长度不正确', '10,20000']],
                  author: [['require', '作者是必须的'], ['length', '作者名字长度不正确', '4,32']]
               };

  //this.auto = {
  //  id:this.new_id
  //};
  //
  //this.new_id = function(){
  //  return math.random();
  //};
}

article_model.prototype = Object.create(model.prototype)

exports  = module.exports = article_model







