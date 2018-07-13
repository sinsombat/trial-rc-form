import { all } from 'redux-saga/effects'

export default sagas => function* saga() {
  return yield all(sagas)
}
