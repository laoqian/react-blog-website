import './styles.less'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import DevTools from '../../lib/DevTools'
import React, { Component, PropTypes } from 'react'
import Header from './Header.container.js';
import MainLeft from './Main-left.container.js';
import MainRight from './Main-right.container.js';


const store = configureStore();

class App  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <MainLeft/>
        <MainRight/>
      </div>
    )
  }
}


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
