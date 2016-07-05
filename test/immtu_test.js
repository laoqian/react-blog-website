/**
 * Created by yu on 2016/7/5.
 */


var im = require('immutable')


var test = im.fromJS({a:[{b:1},{c:2}],d:[{b:1},{c:2}]});


console.log(test.toJS());
console.log(test.toJS());
console.log(test);
console.log(test.toJS()!==test.toJS());