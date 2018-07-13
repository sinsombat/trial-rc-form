import React from 'react'
import express from 'express'
import { render } from '@jaredpalmer/after'
import { Provider as StoreProvider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { ConnectedRouter } from 'connected-react-router/immutable'
import configureStore from './store/configureStore'

import routes from './routes'
import Document from './Document'

const assets = require(process.env.RAZZLE_ASSETS_MANIFEST)

const server = express()

server
  .disable('x-powered-by')
  .use(express.static(process.env.RAZZLE_PUBLIC_DIR))
  .get('/*', async (req, res) => {
    const { store, history, runSaga, closeSaga } = configureStore()

    const customRenderer = (node) => {
      const App = (
        <StoreProvider store={ store } >
          <ConnectedRouter history={ history }>
            {node}
          </ConnectedRouter>
        </StoreProvider>
      )

        const serverState = store.getState({})
        const html = renderToString(App)

        return {
          html,
          serverState
        }
      }
    try {
      const sagaTask = await runSaga()
      const html = await render({
        req,
        res,
        routes,
        assets,
        customRenderer,
        document: Document,
        store
      })

      closeSaga()

      await sagaTask.done

      res.send(html)
    } catch (error) {
      console.error(error)
      res.json(error)
    }
  })

export default server;
