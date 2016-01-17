import { combineReducers } from 'redux';
import mainMenu from './mainMenu';
import SearchBar from './search-bar';


const rootReducer = combineReducers({
  mainMenu,
  explore:SearchBar
});

export default rootReducer;
