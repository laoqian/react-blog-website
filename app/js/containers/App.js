import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import SearchBar from '../components/Explore';
import Header from '../components/Header';
import TableComponent from '../components/Table';
import * as user_search from '../actions/search';
import React,{Component} from 'react';

import {fetchUser} from '../actions/search'


class App  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <SearchBar counter={this.props.count}
                   actions={this.props.actions} />
      </div>
    )
  }
}


function mapStateToProps(state){
  return {
    id:111,
    sd:22
  }
}

export default connect(
  mapStateToProps,
  fetchUser
)(App);
