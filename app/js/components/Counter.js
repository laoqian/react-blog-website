import React, { Component, PropTypes } from 'react'

class Counter extends Component {
  render() {
    let styles = {
      color:'red',
      background:'#00CCFF',
      width:'100px',
      height:'30px'
    };

    const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props;
    return (
      <p  >
        Clicked: {counter} times
        {' '}
        <button style={styles} onClick={increment}>+</button>
        {' '}
        <button onClick={decrement}>-</button>
        {' '}
        <button onClick={incrementIfOdd}>Increment if odd</button>
        {' '}
        <button onClick={() => incrementAsync()}>Increment async</button>
      </p>
    )
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};

export default Counter;
