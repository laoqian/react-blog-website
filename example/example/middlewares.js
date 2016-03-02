/**
 * Created by gg on 2016/3/2.
 */


const fetch = store => next => action => {



  let result = next(action)
  return result
}