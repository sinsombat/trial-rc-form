import React from 'react';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';
import configuredStore from './store/configuredStore';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from './routes';

const store = configuredStore(window.__PRELOADED_STATE__);

ensureReady(routes).then((data) =>
  hydrate(
    <BrowserRouter>
      <Provider store={store}>
        <After data={data} routes={routes} />
      </Provider>
    </BrowserRouter>,
    document.getElementById('root'),
  ),
);

if (module.hot) {
  module.hot.accept();
}