import './app/less/styles.less'
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import App from './app/js/containers/App';
import configureStore from './app/js/store/configureStore';
import DevTools from './app/js/containers/DevTools'


const store = configureStore();


if(process.env.NODE_ENV !=='production'){
  render(
    <Provider store={store}>
      <div>
        <App />
        <DevTools />
      </div>
    </Provider>,
    document.getElementById('root')
  );
}else{
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
