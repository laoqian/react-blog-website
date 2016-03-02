import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import { combineReducers } from 'redux';
import {filiter_reducer,user_reducer,menu_reducer,page_reducer} from './reducer.js';


const rootReducer = combineReducers({
  mainMenu:menu_reducer,
  explore:filiter_reducer,
  user_tab:user_reducer,
  pages:page_reducer
});


if(__DEV__){
  var DevTools = require( '../public/componet/DevTools')
  var createStoreWithMiddleware = compose(
    applyMiddleware(thunk),
    DevTools.instrument()
  )(createStore);

}else{
  var createStoreWithMiddleware = compose(
    applyMiddleware(thunk)
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