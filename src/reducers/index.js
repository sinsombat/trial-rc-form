import { combineReducers } from 'redux';
import counter from './counter';
import multiForm from './forms'; 

const rootReducer = combineReducers({
  counter,
  multiForm,
});

export default rootReducer;
