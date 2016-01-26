/**
 * Created by gg on 2016/1/10.
 */

var model = require('./lib/model');

function vip_model(pool){
  model.call(this,pool);

  this.table = 'eb_category';

  this.rules = {
                  name:[['require', '栏目名字重复'], ['length', '栏目名长度不正确！', '3,20']],
                  comm:[['require', '说明是必须的'], ['length', '说明长度不正确', '10,40']]
               };

  this.auto = {
    id:this.new_id
  };

  this.new_id = function(){
    return math.random();
  };

}

vip_model.prototype = Object.create(model.prototype);

exports  = module.exports = vip_model;







