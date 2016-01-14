import { USER_SEARCH } from '../actions/search'

const Menu = ['板块管理','主题管理','回复管理'];



export default function mainMenu(state = Menu, action) {
  switch (action.type) {
    case USER_SEARCH:
      return action.id;
    default:
      return state
  }
}
