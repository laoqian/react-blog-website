
/**
 * Created by yu on 2016/3/20.
 */

var res =0;


function get_num(arr){
  var arr1=[];
  if(arr.length==1){
    res = arr[0];
    return;
  }

  for(var i=0;i<arr.length;i++){
    if((i+1)%2==0){
      arr1.push(arr[i])
    }
  }

  get_num(arr1);
}


for(var i=2;i<=1024;i++){
  var arr=[]
  for(var j=1;j<=i;j++){
    arr.push(j)
  }

  get_num(arr)
  console.log(`${i} -->${res}`)
}





