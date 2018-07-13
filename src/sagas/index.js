import { call } from 'redux-saga/effects'
import createSaga from 'createSaga'
import counterSaga from './counter'

export default createSaga([
  call(counterSaga)
])
