import { createStore, applyMiddleware ,compose } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../lib/DevTools';
import { combineReducers } from 'redux';
import mainMenu from './menu.reducer.js';
import SearchBar from './search-bar.reducer.js';


const rootReducer = combineReducers({
  mainMenu,
  explore:SearchBar
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