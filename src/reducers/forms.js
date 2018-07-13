import { fromJS } from 'immutable'
import { ADD_FORM, UPDATE_FORM, REMOVE_FORM } from '../actions';

const initialState = fromJS({
  key : 0,
  forms : []
})

function remove(array, element) {
  return array.filter(e => e.key !== element);
}

export default (state = {...initialState}, action) => {
  switch (action.type) {
    case ADD_FORM: {
      state.forms.push({
        key : state.key,
        value : ''
      })
      state.key++
      return {
        ...state
      }
    }
    case REMOVE_FORM: {
      const forms = remove(state.forms, action.key)
      return {
        ...state,
        forms
      }
    }
    case UPDATE_FORM: {
      const {key, value} = action
      const index = state.forms.findIndex(item => item.key === key)
      state.forms[index] = {
        ...state.forms[index],
        value
      }
      return {
        ...state
      }
    }
    default:
      return state;
  }
};
