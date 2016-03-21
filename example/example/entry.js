import './index.less'
import ReactDom, { render ,Component, PropTypes} from 'react';
import { Router, Route, browserHistory,Link } from 'react-router'
import { Provider } from 'react-redux';
import { createHistory } from 'history'
import configureStore from './store/configureStore';
import Header from './containers/header';
import Footer from './containers/footer';
import BlogList from './containers/bloglist';

const store = configureStore();

class PROJ_MNG  extends Component{
  render() {
    return (
      <div className="flex wrapper">
        <Header/>
        <BlogList/>
        <Footer/>
      </div>
    )
  }
}




class App extends  Component{
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/" component={PROJ_MNG}/>
        <Route path="/art-post" component={PROJ_MNG}/>
      </Router>
    )
  }
}


if(__DEV__){
  render(
    <Provider store={store}>
      <div>
        <App />
      </div>
    </Provider>,
    document.getElementById('root')
  );
}else {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}
