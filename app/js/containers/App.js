import React, { Component, PropTypes } from 'react'
import Header from '../components/Header';
import MainLeft from './Main-left';
import MainRight from './Main-right';


class App  extends Component{
  render() {
    return (
      <div className="wrapper">
        <Header/>
        <MainLeft/>
        <MainRight/>
      </div>
    )
  }
}

export default App;