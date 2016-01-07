import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Counter from '../components/Counter';
import Header from '../components/Header';
import * as CounterActions from '../actions/counter';
import React from 'react';
import DevTools from './DevTools';

let App = React.createClass({
  render() {
    return (
      <div className="wrapper">
        <Counter />
      </div>
    )
  }
});

function mapStateToProps(state) {
  return {
    counter: state.counter
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(CounterActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
