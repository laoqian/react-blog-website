import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import Header from '../components/Header';
import * as CounterActions from '../actions/counter';
import React,{Component} from 'react';


class App  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Counter counter={this.props.counter} actions={this.props.actions} />
      </div>
    )
  }
}

export default connect(state=>({
    counter: state.counter
}), dispatch =>({
  actions: bindActionCreators(CounterActions, dispatch)
}))(App);
