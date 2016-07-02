/**
 * Created by gg on 2016/1/20.
 */
import  {Menu} from '../public/lib/menu.js'
import  {Explore} from '../public/lib/explore.js'
import $ from 'jquery'
import {UPDATE_TIME,LOAD_ARTICLE} from  './actions/action'

var init={}
var menuArr =[
  {pid:0,name:"全部项目"},
  {pid:0,name:"编辑项目"},
  {pid:0,name:"编辑项目"},
  {pid:0,name:"编辑项目",link:'proj_editor'},
  {pid:1,name:"123",link:'proj_editor'},
  {pid:1,name:"asdf",link:'proj_editor'},
  {pid:1,name:"sasdf",link:'proj_editor'}
];
init.menu  = new Menu()
init.menu.addByArr(menuArr)


init.user_tab = [
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式'],
  ['名字','住址','联系方式']
]

init.bar  = new Explore();
init.bar.addInput({name:'用户名',placeholder:'你的名字',value:'我的名字'});
init.bar.addSelect({
  name:'德国',
  op:['中国', '美国', '俄罗斯','韩国']
});
init.bar.addSelect({
  name:'国籍',
  op:['中国', '美国', '俄罗斯','韩国']
});
init.bar.addSelect({
  name:'曾近',
  op:['中国', '美国', '俄罗斯','韩国']
});

//fetch('./user_search',{
//    method: "POST",
//    headers: {
//      "Content-Type": "application/x-www-form-urlencoded"
//    },
//    body:"key=123"
//  }
//).then(res=>console.log(res))
//  .catch(err=>console.log(err));

init.pages = {
  cur: 10 ,
  total:10,
  menu_num:5
}


function  load_article_list(store){
  $.get('/get_article_list',
    function(data,status){
      if(data.status==true){
        store.dispatch({
          type:LOAD_ARTICLE,
          art_list:data.rows
        });
      }else{
        console.log(data.info);
      }
    });
}

function timer_init(store){
  setInterval(()=>{
    store.dispatch({
      type:UPDATE_TIME
    })
  },1000)
}


init.app_init = function (store){
  load_article_list(store);
  //timer_init(store);
}

export default init;