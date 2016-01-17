/**
 * Created by gg on 2016/1/17.
 */

export function Explore(){
  this.name = '搜索组件'
  this.componet = []
  this.notice=''
  this.button={
    name:'name'
  }
}

Explore.prototype.addInput = function(input){

  input.type ='input';

  if(!input.value){
    input.value='';
  }

  if(!input.placeholder){
    input.placeholder='2222';
  }

  if(!input.name){
    input.name='输入框';
  }

  input.id = this.componet.length;

  this.componet.push(input);
};

Explore.prototype.addSelect = function(sel){

  sel.type ='select';

  if(!sel.name){
    sel.name='选择框';
  }
  let i =0;
  sel.op.forEach(op=>op.id=i++)
  sel.id = this.componet.length

  this.componet.push(sel);
};



Explore.prototype.get = function(){
  var com = this.componet.slice(0,this.componet.length);

  com.push(this.button);
  return com;
}

