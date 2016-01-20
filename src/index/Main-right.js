import React, { Component, PropTypes } from 'react'
import Explore from './../../componet/Explore.js'
import Table from './../../componet/Table.js'
import {exploreAction} from './action.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class MainRight extends Component {

  render() {
    return (
      <div className="main-right">
        <Explore coms={this.props.explore}
                 onChange={this.props.onChange}/>
        <Table table={this.props.user_tab}/>
      </div>
    )
  }
}




function mapStateToProps(state){
  return{
    explore:state.explore,
    user_tab:state.user_tab
  }
}

function mapActionToProps(dispatch){
  return{
    onChange:bindActionCreators(exploreAction,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(MainRight);


