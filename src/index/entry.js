import './index.less'
import React from 'react'
import  ReactDom, {Component, PropTypes} from 'react'
import {render} from 'react-dom'
import {Router, Route, IndexRoute, Link} from 'react-router'
import {Provider}     from 'react-redux';
import configureStore   from './store/configureStore'
import Header            from  './containers/header'
import Footer            from  './containers/footer'
import BlogList        from  './containers/bloglist'
import NewTheme        from  './containers/newth'
import Reading            from  './containers/reading'
import ContentHeader    from  './containers/content-header'
import {GET_ARTICLE} from  './action_type'
import  app_init  from './init'
import {createHistory, createHashHistory, useBasename} from 'history'


const store = configureStore();
app_init(store);


/**
 * 获取文章根据id
 * @param nextState
 * @param replace
 * @returns {boolean}
 */
const article_get = (nextState, replace) => {
    let id = nextState.params.articleid;

    if (id) {
        store.dispatch({
            type: GET_ARTICLE,
            ajax_type: 'post',
            data: {article_id: id},
            uri: '/article_get'
        });
    }
    return true;
}


class MainPage extends Component {
    render() {
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

const history = useBasename(createHashHistory)({
    queryKey: '_key',
    basename: '/lotuses-side'
});


function enter_art_post(state, rep) {
    console.log(state);
    console.log(rep);
}

class App extends Component {
    render() {
        return (
            <div >
                <Router history={history}>
                    <Route path="/" component={MainPage}>
                        <IndexRoute component={BlogList}/>
                        <Route path="/art-post"
                               onEnter={enter_art_post}
                               component={NewTheme}/>
                        <Route path="/reading/:articleid"
                               onEnter={article_get}
                               component={Reading}/>
                    </Route>
                </Router>
            </div>
        )
    }
}


if (__DEV__) {
    // var DevTools = require('../public/componet/DevTools')
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
} else {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('root')
    );
}
