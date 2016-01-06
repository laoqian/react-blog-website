import './app/less/styles.less'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/js/containers/App';
import configureStore from './app/js/store/configureStore';

const store = configureStore();

render(
  <Provider store={store}>
      <App />
  </Provider>,
  document.getElementById('root')
);
