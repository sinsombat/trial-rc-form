export const INCREMENT_COUNTER = 'INCREMENT_COUNTER';
export const DECREMENT_COUNTER = 'DECREMENT_COUNTER';
export const DECREMENT_COUNTER_SUCCESS = 'DECREMENT_COUNTER_SUCCESS';
export const ADD_FORM = 'ADD_FORM';
export const REMOVE_FORM = 'REMOVE_FORM';
export const UPDATE_FORM = 'UPDATE_FORM';

export const increment = () => ({
  type: INCREMENT_COUNTER,
});

export const decrement = () => ({
  type: DECREMENT_COUNTER,
});

export const decrementSuccess = (count) => ({
  type: DECREMENT_COUNTER_SUCCESS,
  count
});

export const incrementAsync = (delay = 1000) => dispatch => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export const addForm = () => ({
  type: ADD_FORM
})

export const removeForm = (key) => ({
  type: REMOVE_FORM,
  key
})

export const updateForm = (key, fields) => ({
  type: UPDATE_FORM,
  fields, key
})

