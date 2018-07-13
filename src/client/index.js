import uniqueId from 'lodash/uniqueId'
import { fromJS } from 'immutable'
import React from 'react'
import { hydrate } from 'react-dom'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router/immutable'
import { ensureReady, After } from '@jaredpalmer/after'

import configureStore from '../store/configureStore'
// import '../client.css'
import routes from '../routes'

const { store, history, runSaga, closeSaga } = configureStore(fromJS(window.__PRELOADED_STATE__))


async function render() {
  let sagaTask = await runSaga()
  const data = await ensureReady(routes)

  const component = hydrate(
    <StoreProvider key={uniqueId()} store={store}>
      <ConnectedRouter history={ history }>
        <After data={data} routes={routes} />
      </ConnectedRouter>
    </StoreProvider>,
    document.getElementById('root')
  )

  if (module.hot) {
    module.hot.accept('../sagas', async () => {
      const nextSaga = require('../sagas')

      sagaTask.cancel()

      await sagaTask.done
      sagaTask = runSaga(function* replacedSaga (action) {
        yield nextSaga()
      })
    })
  }

  return component
}

render()


if (module.hot) {
  module.hot.accept()
}
