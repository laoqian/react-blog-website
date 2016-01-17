import React, { Component, PropTypes } from 'react'
import Explore from '../components/Explore'
import {menuAction} from '../actions/menuAction'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class MainRight extends Component {

  render() {
    console.log(this.props);
    return (
      <div className="main-right">
        <Explore coms={this.props.explore} notice={this.props.notice}/>
      </div>
    )
  }
}


function mapStateToProps(state){
  return{
    explore:state.explore,
    notice:'我的提醒'
  }
}

function mapActionToProps(dispatch){
  return{
    onChange:bindActionCreators(menuAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(MainRight);


