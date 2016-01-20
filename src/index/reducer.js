import {EXPLORE_CHANGE } from './action.js'
import {MENU_CLICK } from './action.js'
import init from './index.init'


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
