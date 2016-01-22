/**
 * Created by gg on 2016/1/20.
 */
import  {Menu} from '../public/lib/menu.js'
import  {Explore} from '../public/lib/explore.js'
import fetch from  'isomorphic-fetch'

var init={}
var menuArr =[
  {pid:0,name:"用户管理"},
  {pid:0,name:"主题管理"},
  {pid:0,name:"回复管理"},
  {pid:0,name:"邀请码"},
  {pid:1,name:"用户查询",link:'./user_search'},
  {pid:1,name:"用户添加",link:'./user_add'},
  {pid:2,name:"菜单7"},
  {pid:2,name:"菜单8"},
  {pid:3,name:"菜单9"},
  {pid:3,name:"菜单12"}
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
init.bar.addInput({name:'用户名',placeholder:'你的名字'});
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


export default init