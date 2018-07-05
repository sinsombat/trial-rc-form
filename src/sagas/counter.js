import { takeEvery, put } from 'redux-saga/effects'
import { DECREMENT_COUNTER, decrementSuccess } from '../actions'

export function* counter () {
  yield put(decrementSuccess(1));
}

export default function* counterSaga() {
  yield takeEvery(DECREMENT_COUNTER, counter)
}
