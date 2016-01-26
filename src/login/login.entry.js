import './login.less'
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import DevTools from '../public/componet/DevTools'
import Login from './Login'

const store = configureStore();


class App  extends Component{
  render() {
    return (
      <div className="wrapper">
       <Login/>
      </div>
    )
  }
}


if(__DEV__){
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
