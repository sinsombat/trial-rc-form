import { combineReducers } from 'redux-immutable'

import counter from './counter';
import multiForm from './forms'; 

export default combineReducers({
  counter,
  multiForm
})
