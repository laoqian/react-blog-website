import init from './../init.js'
import Immutable  from 'immutable'
import moment from 'moment'
import * as action_type   from  '../action_type'
import { browserHistory } from 'react-router'



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
    case action_type.UPDATE_TIME:
    default:
      return moment().format('YYYY年MMMDo,ah:mm:ss')
  }
}


//let pages  = immutable.Map(init.pages)
//
//export function page_reducer(state=pages.toJS(), action){
//  switch (action.type){
//    case TURN_PAGE:
//      let cur = state.cur;
//      if(action.page=='pre-page'){
//        cur>1 && cur--
//      }else if(action.page=='next-page'){
//        cur<state.total && cur++
//      }else{
//        cur = action.page
//      }
//
//      let new_pages= pages.set('cur',cur)
//      return new_pages.toJS()
//    default:
//      return state
//  }
//}


let articles = Immutable.Map({});
export function article_reducer(state = articles.toJS(), action) {
  let data = action.data


  switch (action.type) {
    case action_type.GET_ARTICLE:
      if(data.status==true){
        articles = articles.merge({recent_one:data.rows[0]});
      }
      return articles.toJS();
    case action_type.POST_ARTICLE:
      console.log(browserHistory);
      if(data.status==true){
        browserHistory.push(`/reading/${data.sqlinfo.rows.insertId}`);
      }
      return state;
    case action_type.LOAD_ARTICLE:
      if(data.status==true){
        articles = articles.merge({recent_tweenty:data.rows});
      }
      return articles.toJS();
    case action_type.LOAD_HOTS:
      if(data.status==true){
        articles = articles.merge({recent_ten_hots:data.rows});
      }
      return articles.toJS();
    default:
      return {recent_one:undefined,recent_tweenty:undefined,recent_ten_hots:undefined};
  }
}
