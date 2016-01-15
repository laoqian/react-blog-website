import fetch from 'isomorphic-fetch';

export const MENU_CLICK = '菜单点击';
const ADMIN_URL = 'https://localhost/admin/user_search'

export function menuAction(id) {
  return {
    type:MENU_CLICK,
    id:id
  }
}

