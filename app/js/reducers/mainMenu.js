import { USER_SEARCH } from '../actions/search'

const Menus = ['板块管理','主题管理','回复管理'];
const subMenu = {
  "板块管理":['111','222','333'],
  "主题管理":['444','233','366'],
  "回复管理":['555','244','355']
};


export default function mainMenu(state = {Menus,subMenu}, action) {
  switch (action.type) {
    case USER_SEARCH:
      return action.id;
    default:
      return state
  }
}
