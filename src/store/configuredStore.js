import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import createSagaMiddleware from 'redux-saga'
import mainSaga from '../sagas'
import rootReducer from '../reducers'

export default (initialState = {}) => {
  const sagaMiddleware = createSagaMiddleware()

  const configuredStore = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  )
  configuredStore.sagaTask = sagaMiddleware.run(mainSaga)

  return configuredStore
}