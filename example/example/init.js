/**
 * Created by gg on 2016/1/20.
 */
import  {Menu} from '../public/lib/menu.js'
import  {Explore} from '../public/lib/explore.js'
import $ from 'jquery'
import * as define from  './actions/action'

var init={}

function timer_init(store){
  setInterval(()=>{
    store.dispatch({
      type:define.UPDATE_TIME
    })
  },1000)
}


init.app_init = function (store){
  //timer_init(store);
}

export default init;