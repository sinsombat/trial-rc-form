import { all, call } from 'redux-saga/effects'
import counterSaga from './counter'

const sagas = [
  call(counterSaga),
]

export default function* mainSaga() {
  yield all(sagas)
}