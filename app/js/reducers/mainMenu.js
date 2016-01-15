import { MENU_CLICK } from '../actions/menuAction'
import  {Menu} from '../lib/menu'

var menuArr =[
  {pid:0,name:"菜单1"},
  {pid:1,name:"菜单2"},
  {pid:1,name:"菜单3"},
  {pid:1,name:"菜单5"},

];

var menu = new Menu();

menu.addByArr(menuArr);

export default function mainMenu(state = menu.get(), action) {
  switch (action.type) {
    case MENU_CLICK:
      menu.subChangeStateById(action.id)
      return menu.get();
    default:
      return state
  }
}
