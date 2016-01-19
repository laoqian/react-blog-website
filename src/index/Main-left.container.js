import React, { Component, PropTypes } from 'react'
import Menus from './Menus.component.js'
import {menuAction} from './action.js'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class MainLeft extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-left">
        <Menus menu={this.props.menu} onChange={this.props.onChange}/>
      </div>
    )
  }
}

MainLeft.propTypes = {
  menu: PropTypes.array.isRequired,
  onChange:PropTypes.func.isRequired
};


function mapStateToProps(state){
  return{
    menu:state.mainMenu
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
)(MainLeft);
