import './styles.less'
import { render } from 'react-dom';
import React, { Component, PropTypes } from 'react'
import { Router, Route, browserHistory,Link } from 'react-router'
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import DevTools from '../public/componet/DevTools'
import Header from './Header';
import MainLeft from './main-left';
import ProjSeach from './proj-search';
import ProjEditor from './proj-editor';
import { createHistory } from 'history'

const store = configureStore();

class PROJ_MNG  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <MainLeft/>
        {this.props.children|| <ProjSeach/>}
      </div>
    )
  }
}



class App extends  Component{
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={PROJ_MNG}>
          <Route path="/proj_search" component={ProjSeach}/>
          <Route path="/proj_editor" component={ProjEditor}/>
        </Route>
      </Router>
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
