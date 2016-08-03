import immutable  from 'immutable'
import moment from 'moment'
import * as action_type   from  '../action_type'
import { browserHistory } from 'react-router'



var web_path = [
    {name:'于其先得网络日志',link:'/'},
    {name:'首页',link:'/'},
]

function path_reducer(state = web_path, action) {
  switch (action.type) {
    default:
      return state
  }
}

moment.locale('zh-cn');//设置为中文

 function update_time_reducer(state = web_path, action) {
  switch (action.type) {
    case action_type.UPDATE_TIME:
    default:
      return moment().format('YYYY年MMMDo,ah:mm:ss')
  }
}

let articles = immutable.Map({recent_one:undefined,home_page_data:undefined});
 function article_reducer(state = articles.toJS(), action) {
  let data = action.data

  switch (action.type) {
    case action_type.LOAD_HOME_PAGE_DATA:
      if(data.status==true){
        articles = articles.merge({home_page_data:data.home_page_data});
      }
      return articles.toJS();
    case action_type.GET_ARTICLE:
      if(data.status==true){
        articles = articles.merge({recent_one:data.rows[0]});
      }
      return articles.toJS();
    case action_type.POST_ARTICLE:
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
      return state;
  }
}


let website_state = immutable.Map({header_style:{},user:{}});

/**
 * 网站状态
 * @param state
 * @param action
 * @returns {*}
 */
function website_reducer(state = website_state.toJS(), action) {

  switch (action.type) {
    case action_type.USER_LOGIN:
      if(action.data.status==true){
        website_state = website_state.merge({user:action.data.user});
      }

      return website_state.toJS();
    case action_type.USER_LOGOUT:
      if(action.data.status==true){
        website_state = website_state.merge({user:{}});
      }

      return website_state.toJS();
    case action_type.PAGE_SCROLL:
      let postion = document.getElementsByTagName('body')[0].scrollTop;
      let obj;
      if(postion>5 && postion<=25){
          obj = {header_style:{height:60-postion,class:'header-opacity'}};
      }else if(postion>25){
        obj = {header_style:{height:35,class:'header-opacity'}};
      }else{
        obj = {header_style:{height:60,class:'header-no-opacity'}};
      }
      website_state = website_state.merge(obj)
      return website_state.toJS();
    default:
      return state;
  }
}


import {reducer as formReducer} from 'redux-form';

let  reducers = {
  web_path:path_reducer,
  time    :update_time_reducer,
  article :article_reducer,
  website :website_reducer,
  form :formReducer
}

export default reducers ;
