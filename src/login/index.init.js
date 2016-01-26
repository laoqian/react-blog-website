/**
 * Created by gg on 2016/1/20.
 */
import  {Menu} from '../public/lib/menu.js'
import  {Explore} from '../public/lib/explore.js'
import fetch from  'isomorphic-fetch'

var init={}
var menuArr =[
  {pid:0,name:"全部项目",link:'./proj_search'},
  {pid:0,name:"编辑项目",link:'./proj_editor'}
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