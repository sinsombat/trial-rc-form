import { ADD_FORM, UPDATE_FORM, REMOVE_FORM } from '../actions';

const initialState = {
  key : 0,
  forms : []
}

function remove(array, element) {
  return array.filter(e => e.name !== element);
}

export default (state = {...initialState}, action) => {
  switch (action.type) {
    case ADD_FORM: {
      state.forms.push({
        name : `item_${state.key}`,
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
      const { fields } = action
      const index = state.forms.findIndex(item => item.name === fields.name)
      state.forms[index] = {
        ...fields
      }
      return {
        ...state
      }
    }
    default:
      return state;
  }
};
