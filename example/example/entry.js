import './index.less'
import ReactDom, { render ,Component, PropTypes} from 'react';
import { Router, Route, browserHistory,Link } from 'react-router'
import { Provider } from 'react-redux';
import { createHistory } from 'history'
import configureStore from './store/configureStore';
import Header 		 from  './containers/header';
import Footer 		 from  './containers/footer';
import BlogList 	 from  './containers/bloglist';
import NewTheme 	 from  './containers/newth';
import Article 	     from  './containers/article';
import {UPDATE_TIME,LOAD_ARTICLE} from  './actions/action'
import $ from 'jquery';


const store = configureStore();


function  load_article_list(){
  $.get('/get_article_list',
    function(data,status){
      console.log(data);
      if(data.status==true){
        store.dispatch({
          type:LOAD_ARTICLE,
          art_list:data.rows
        });

        console.log('加载成功')
      }else{
        console.log(data.info);
      }
    });
}

(function App_init(){
  setInterval(()=>{
    store.dispatch({
      type:UPDATE_TIME
    })
  },1000)

  load_article_list();
})()


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
        <Article/>
        <Footer/>
      </div>
    )
  }
}



class App extends  Component{
  render(){
    return (
      <Router history={browserHistory}>
        <Route path="/"         component=  {Index}/>
        <Route path="/art-post" component=  {ArtPost}/>
		<Route path="/article"  component=  {ArtDisplay}/>
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
        <DevTools/>
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
