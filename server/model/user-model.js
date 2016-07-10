/**
 * Created by gg on 2016/1/10.
 */

var model = require('./lib/model');

function user_model(pool){
  model.call(this,pool);

  this.table = 'rb_user';

  this.rules = {
                  username:[['require', '用户名不存在'], ['length', '用户名长度不正确！', '10,20']],
                  password:[['require', '密码不存在'], ['length', '密码长度不正确！'  , '6,20']],
               };

}

user_model.prototype = Object.create(model.prototype)

exports  = module.exports = user_model







