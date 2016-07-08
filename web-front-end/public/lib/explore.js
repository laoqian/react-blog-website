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

Explore.prototype.repeatCheck= function(component){
  var ret = true
  this.componet.forEach(com=>{
    if(com.name == component.name) {
      ret =false
      console.log('explore组件名字重复')
    }
  })

  return ret
}

Explore.prototype.addInput = function(input){

  if(!this.repeatCheck(input)){
    return
  }

  input.type ='input';

  if(!input.name){
    throw  new Error('输入框必须有个名字')
  }

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
  if(!this.repeatCheck(sel)){
    return
  }
  sel.type ='select'

  if(!sel.name){
    throw  new Error('选择框必须有个名字')
  }

  for(let i=0;i<sel.op.length;i++){
    let name = sel.op[i];
    sel.op[i]={}
    sel.op[i].name = name
    sel.op[i].id=i
  }

  sel.id = this.componet.length
  sel.value = sel.op[0].value

  this.componet.push(sel)
};
Explore.prototype.set = function(com_name,key,name){

  this.componet.map(com=>{
    if(com.name != com_name){
      return;
    }

    com[key]= name
  })

}


Explore.prototype.get = function(){
  var exp = this.componet.slice(0,this.componet.length)
  return exp
}

