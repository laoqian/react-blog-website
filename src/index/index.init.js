/**
 * Created by gg on 2016/1/20.
 */
import  {Menu} from '../../lib/menu.js'
import  {Explore} from '../../lib/explore.js'

var init={}
var menuArr =[
  {pid:0,name:"菜单1"},
  {pid:0,name:"菜单2"},
  {pid:0,name:"菜单3"},
  {pid:0,name:"菜单4"},
  {pid:1,name:"菜单5"},
  {pid:1,name:"菜单6"},
  {pid:2,name:"菜单7"},
  {pid:2,name:"菜单8"},
  {pid:3,name:"菜单9"},
  {pid:3,name:"菜单12"},
  {pid:4,name:"菜单13"},
  {pid:4,name:"菜单14"},
  {pid:5,name:"菜单15"},
  {pid:5,name:"菜单15"},
  {pid:6,name:"菜单15"},
  {pid:7,name:"菜单15"},
  {pid:8,name:"菜单15"},
  {pid:9,name:"菜单15"},
  {pid:7,name:"菜单15"},
  {pid:7,name:"菜单15"},
  {pid:7,name:"菜单15"},
  {pid:8,name:"菜单15"},
  {pid:8,name:"菜单15"},
  {pid:8,name:"菜单15"},
  {pid:9,name:"菜单15"},
  {pid:10,name:"菜单15"}
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



export default init