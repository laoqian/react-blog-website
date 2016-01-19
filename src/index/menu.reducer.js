import { MENU_CLICK } from './action.js'
import  {Menu} from '../../lib/menu'
import  immutable from 'immutable'

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

var menu = new Menu();

menu.addByArr(menuArr);


export default function mainMenu(state = menu.get(), action) {
  switch (action.type) {
    case MENU_CLICK:
      menu.subChangeStateById(action.id,true);
      return menu.get();
    default:
      return state
  }
}
