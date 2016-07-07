/*
*
*
*
*
**/

import { createStore, applyMiddleware ,compose,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers/reducer.js';
import $ from 'jquery';

const rootReducer = combineReducers(reducers);


//异步ajax中间件
const fetchMiddleware = store => next => action => {

  if(action.ajax_type ==undefined){
    return next(action);
  }

  console.log(action.ajax_type+'请求开始');

  if(action.ajax_type=='post'){
    $.post(action.uri,
      action.data,
      function(data,status){
        action.data = data;
        console.log(action);
        next(action);
      });
  }else if(action.ajax_type=='get'){
    $.get(action.uri,
      function(data,status){
        action.data = data;
        console.log(action);
        next(action);
      });
  }
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