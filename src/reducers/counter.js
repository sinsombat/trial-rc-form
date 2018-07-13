import { fromJS } from 'immutable'
import { INCREMENT_COUNTER, DECREMENT_COUNTER_SUCCESS } from '../actions';

const initialState = fromJS({
  count : 0
})

export default (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return state.set('count', state.get('count') + 1)
    case DECREMENT_COUNTER_SUCCESS:
      
      return state.set('count', state.get('count') - 1)
    default:
      return state;
  }
};
