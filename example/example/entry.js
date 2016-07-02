import './index.less'
import ReactDom, { render ,Component, PropTypes} from 'react';
import { Router, Route, browserHistory,Link } from 'react-router'
import { Provider } from 'react-redux';
import { createHistory } from 'history'
import configureStore from './store/configureStore';
import Header 		   from  './containers/header';
import Footer 		   from  './containers/footer';
import BlogList 	   from  './containers/bloglist';
import NewTheme 	   from  './containers/newth';
import Reading 	     from  './containers/reading';
import {GET_ARTICLE} from  './actions/action'


import {app_init} from './init'

const store = configureStore();




app_init(store);


class Index  extends Component{
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

class ArtPost  extends Component{
  render() {
    return (
      <div className="flex wrapper">
        <Header/>
        <NewTheme/>
        <Footer/>
      </div>
    )
  }
}

class ArtDisplay  extends Component{
  render() {
    return (
      <div className="flex wrapper">
        <Header/>
        <Reading/>
        <Footer/>
      </div>
    )
  }
}

const article_get= (nextState, replace) => {
  let id = nextState.params.articleid;
  if(id){
   let action = {
      type:GET_ARTICLE,
      ajax_type:'post',
      data:{article_id:id},
      uri:'/article_get'
    }


    console.log(action);

    store.dispatch(action);
  }

  return true;
}

class App extends  Component{
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/"         component=  {Index}/>
        <Route path="/art-post" component=  {ArtPost}/>
		    <Route path="/reading/articleid"
               onEnter={article_get}
               component=  {ArtDisplay}/>
      </Router>
    )
  }
}


if(__DEV__){
  var DevTools = require( '../public/componet/DevTools')
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
