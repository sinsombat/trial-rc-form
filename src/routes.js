import React from 'react';

import { asyncComponent } from '@jaredpalmer/after';

export default [
  {
    path: '/',
    exact: true,
    component: asyncComponent({
      loader: () => import('./client/Home'), // required
      Placeholder: () => <div>...LOADING...</div>, // this is optional, just returns null by default
    }),
  },
  {
    path: '/about',
    exact: true,
    component: asyncComponent({
      loader: () => import('./client/About'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
  {
    path: '/form',
    exact: true,
    component: asyncComponent({
      loader: () => import('./client/MultiForm'),
      Placeholder: () => <div>...LOADING...</div>,
    }),
  },
];
