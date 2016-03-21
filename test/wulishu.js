
/**
 * Created by yu on 2016/3/20.
 */
//简单求解无理数
function  get_num(num){
  for(var i=2;i<num;i++){
    if(num%i==0){
      return false;
    }
  }

  return true;
}

var ret = 0

for(var i=1024*1024*1024*10;i>=2;i--){
  var res = get_num(i)
  if(res){
    ret = i
    break;
  }
}


console.log(ret)