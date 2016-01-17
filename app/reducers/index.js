import { combineReducers } from 'redux';
import mainMenu from './mainMenu';
import table from './table';


const rootReducer = combineReducers({
  mainMenu,
  user:table
});

export default rootReducer;
