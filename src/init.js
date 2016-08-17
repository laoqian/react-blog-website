/**
 * Created by gg on 2016/1/20.
 */
import {UPDATE_TIME} from  './action_type'


function timer_init(store) {
  setInterval(() => {
    store.dispatch({
      type: UPDATE_TIME
    })
  }, 1000)
}


var app_init = function (store) {
  timer_init(store);


  window.onscroll = function () {
    store.dispatch({
      type: define.PAGE_SCROLL
    })
  }
}

export default app_init;