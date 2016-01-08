import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import Header from '../components/Header';
import TableComponent from '../components/Table';
import * as CounterActions from '../actions/counter';
import React,{Component} from 'react';


class App  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <Counter counter={this.props.count} actions={this.props.actions} />
        <TableComponent user = {this.props.user}/>
      </div>
    )
  }
}

export default connect(state=>({
    count: state.count,
    user : state.user
}), dispatch =>({
  actions: bindActionCreators(CounterActions, dispatch)
}))(App);
