/*
*
* action
*
* */
export const MENU_CLICK       =   '菜单点击';
export const MENU_LINK        =   '加载页面';
export const TURN_PAGE        =   '切换页面';
export const ART_POST         =   '提交文章';
export const EXPLORE_CHANGE   =   '筛选框改变';
export const UPDATE_TIME      =   '获取时间'
export const LOAD_ARTICLE     =   '加载文章列表'
export const GET_ARTICLE       =   '获取文章'



export function art_post_action(title,content){
  return {
    type:ART_POST,
    ajax_type:'post',
    data:{title,content},
    uri:'/article_post'
  }
}


export function time_action(){

}
