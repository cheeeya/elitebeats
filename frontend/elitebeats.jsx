import React from 'react';
import ReactDOM from 'react-dom';
import configureStore from './store/store';
import Root from './components/root';

import { login } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
  let store;

  store = configureStore({ session: { currentUser: window.currentUser } });

  window.getState = store.getState;

  const rootEl = document.getElementById('root');
  ReactDOM.render(<Root store={store}/>, rootEl);
});
