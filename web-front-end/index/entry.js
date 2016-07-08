import './index.less'
import ReactDom, { render ,Component, PropTypes} from 'react';
import { Router, Route,IndexRoute , browserHistory,Link } from 'react-router'
import { Provider }     from 'react-redux';
import configureStore   from './store/configureStore';
import Header 		    from  './containers/header';
import Footer 		    from  './containers/footer';
import BlogList 	    from  './containers/bloglist';
import NewTheme 	    from  './containers/newth';
import Reading 	        from  './containers/reading';
import ContentHeader    from  './containers/content-header';
import * as action_type from  './action_type'
import {app_init} from './init'



const store = configureStore();
app_init(store);



const article_get= (nextState, replace) => {
  let id = nextState.params.articleid;

  if(id){
    store.dispatch({
      type:action_type.GET_ARTICLE,
      ajax_type:'post',
      data:{article_id:id},
      uri:'/article_get'
    });
  }
  return true;
}


class MainPage extends  Component{
    render(){
        return (
            <div className="flex wrapper">
                <Header/>
                <div className="content-container ">
                    <ContentHeader/>
                    {this.props.children}
                </div>
                <Footer/>
            </div>
        )
    }
}



class App extends  Component{
  render(){
    return (
        <div >
            <Router history={browserHistory}>
                <Route path="/" component={MainPage}>
                    <IndexRoute component={BlogList}/>
                    <Route path="/art-post"
                           component=  {NewTheme}/>
                    <Route path="/reading/:articleid"
                           onEnter={article_get}
                           component=  {Reading}/>
                </Route>
            </Router>
        </div>
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
