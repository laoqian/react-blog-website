import React, { Component, PropTypes } from 'react'
import Explore from './Explore.component.js'
import {exploreAction} from './action.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class MainRight extends Component {

  render() {
    return (
      <div className="main-right">
        <Explore coms={this.props.explore}
                 notice={this.props.notice}
                 onChange={this.props.onChange}/>
      </div>
    )
  }
}




function mapStateToProps(state){
  return{
    explore:state.explore
  }
}

function mapActionToProps(dispatch){
  return{
    onChange:bindActionCreators(exploreAction, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(MainRight);


