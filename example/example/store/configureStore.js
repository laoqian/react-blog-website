import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import {path_reducer,update_time_reducer} from './../reducers/reducer.js';
import fetch from  'isomorphic-fetch'


const rootReducer = combineReducers({
  web_path:path_reducer,
  time:update_time_reducer
});


//异步ajax中间件
const fetchMiddleware = store => next => action => {
  console.log('ajax 请求开始')

  fetch(action.uri,{
    body:'123123',
    method:'post'
  })
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
     return response.json()
    })
    .then(data=>{
      console.log(data)
    })
    .catch(err=>{
      console.log('err-----------')
      console.log(err)
    })

  return next(action)
}


if(__DEV__){
  var DevTools = require( '../../public/componet/DevTools')
  var createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    applyMiddleware(fetchMiddleware),
    DevTools.instrument()
  )(createStore);

}else{
  var createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    applyMiddleware(fetchMiddleware)
  )(createStore);
}



export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
      store.replaceReducer(rootReducer)
  }

  return store;
}