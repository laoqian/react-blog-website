import { combineReducers } from 'redux';
import counter from './counter';
import table from './table';


const rootReducer = combineReducers({
  count:counter,
  user:table
});

export default rootReducer;
