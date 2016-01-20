import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../componet/DevTools';
import { combineReducers } from 'redux';
import {filiter_reducer,user_reducer,menu_reducer} from './reducer.js';


const rootReducer = combineReducers({
  mainMenu:menu_reducer,
  explore:filiter_reducer,
  user_tab:user_reducer
});

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
      store.replaceReducer(rootReducer)
  }

  return store;
}