import { INCREMENT_COUNTER, DECREMENT_COUNTER, DECREMENT_COUNTER_SUCCESS } from '../actions';

const initialState = {
  count : 0
}

export default (state = {...initialState}, action) => {
  switch (action.type) {
    case INCREMENT_COUNTER:
      return { 
        count: state.count + 1 
      }
    case DECREMENT_COUNTER:
      return {
        ...state
      }
    case DECREMENT_COUNTER_SUCCESS:
      state.count -= action.count
      return {
        ...state
      }
    default:
      return state;
  }
};
