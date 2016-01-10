import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/Explore';
import Header from '../components/Header';
import TableComponent from '../components/Table';
import * as user_search from '../actions/search';
import React,{Component} from 'react';


class App  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <SearchBar counter={this.props.count}
                   actions={this.props.actions} />
        <TableComponent user = {this.props.user}/>
      </div>
    )
  }
}

export default connect(state=>({
    count: state.count,
    user : state.user
}), dispatch =>({
  actions: bindActionCreators(user_search, dispatch)
}))(App);
