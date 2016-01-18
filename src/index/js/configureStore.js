import { createStore, applyMiddleware ,compose,combineReducers } from 'redux';
import thunk from 'redux-thunk';
import DevTools from '../../../public/DevTools';
import mainMenu from './mainMenu';
import SearchBar from './search-bar';


const reducer = combineReducers({
  mainMenu,
  explore:SearchBar
});

const createStoreWithMiddleware = compose(
  applyMiddleware(thunk),
  DevTools.instrument()
)(createStore);


export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(reducer, initialState);

  if (module.hot) {
      // Enable Webpack hot module replacement for reducers
      store.replaceReducer(reducer)
  }

  return store;
}
