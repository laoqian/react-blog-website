import{
  EXPLORE_CHANGE,
  MENU_CLICK,
  TURN_PAGE,
  USERNAME_CHG,
  UPDATE_TIME,
  LOAD_ARTICLE
} from './../actions/action.js'

import init from './../init.js'
import immutable from 'immutable'
import moment from 'moment'




var web_path = [
    {name:'于其先得网络日志',link:'/'},
    {name:'首页',link:'/'},
]

export function path_reducer(state = web_path, action) {
  switch (action.type) {
    default:
      return state
  }
}

moment.locale('zh-cn');//设置为中文

export function update_time_reducer(state = web_path, action) {
  switch (action.type) {
    case UPDATE_TIME:
    default:
      return moment().format('YYYY年MMMDo,ah:mm:ss')
  }
}


let pages  = immutable.Map(init.pages)

export function page_reducer(state=pages.toJS(), action){
  switch (action.type){
    case TURN_PAGE:
      let cur = state.cur;
      if(action.page=='pre-page'){
        cur>1 && cur--
      }else if(action.page=='next-page'){
        cur<state.total && cur++
      }else{
        cur = action.page
      }

      let new_pages= pages.set('cur',cur)
      return new_pages.toJS()
    default:
      return state
  }
}

export function load_article_reducer(state = [], action) {
  switch (action.type) {
    case LOAD_ARTICLE:
      console.log(action);
      return action.art_list;
    default:
      return state;
  }
}

