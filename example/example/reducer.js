import{
  EXPLORE_CHANGE,
  MENU_CLICK,
  TURN_PAGE,
  USERNAME_CHG
} from './action.js'

import init from './init.js'
import immutable from 'immutable'


export function menu_reducer(state = init.menu.get(), action) {
  switch (action.type) {
    case MENU_CLICK:
      init.menu.subChangeStateById(action.id,true)
      return init.menu.get();
    default:
      return state
  }
}

export function filiter_reducer(state=init.bar.get(), action){
     switch (action.type){
       case EXPLORE_CHANGE:
         return action.explore
       case USERNAME_CHG:
         init.bar.set('用户名','value',action.username)
         return init.bar.get()
       default:
           return state
     }
}

export function user_reducer(state=init.user_tab, action){
  switch (action.type){
    case EXPLORE_CHANGE:
      return action.explore
    default:
      return state
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
