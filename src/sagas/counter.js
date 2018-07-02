import { takeEvery } from 'redux-saga/effects'
import { INCREMENT_COUNTER } from '../actions'

export function* counter () {
  console.log("in saga")
  yield
}

export default function* counterSaga() {
  yield takeEvery(INCREMENT_COUNTER, counter)
}
