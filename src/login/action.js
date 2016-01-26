import fetch from 'isomorphic-fetch';

export const MENU_CLICK = '菜单点击';
export const MENU_LINK=   '加载页面';
export const TURN_PAGE=   '切换页面';
export const EXPLORE_CHANGE = '筛选框改变';
const ADMIN_URL = 'https://localhost/admin/user_search'

export function menuAction(menu) {

  if(menu.link=='#'){
    return {
      type:MENU_CLICK,
      id:menu.id
    }
  }else{
    return {
      type:MENU_LINK,
      link:menu.link
    }
  }

}


export  function exploreAction(explore){
  return {
    type:EXPLORE_CHANGE,
    explore
  }
}


export function pageAction(page){
  return {
    type:TURN_PAGE,
    page
  }
}
