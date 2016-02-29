import React, { Component, PropTypes } from 'react'
import {exploreAction,pageAction} from './action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class ProjEditor extends Component {

  render() {
    return (
      <div className="main-right">
        <form className="proj-editor">
          <table>
            <tr>
              <td colSpan="2">
                <h3>{'编辑项目'}</h3>
              </td>
            </tr>
            <tr>
              <td className="title">{'项目名称:'}</td>
              <td>
                <input type="text" />
                <select name="" id="">
                  <option value="0">WEB应用</option>
                  <option value="1">桌面应用</option>
                  <option value="2">安卓APP</option>
                  <option value="3">苹果APP</option>
                </select>
              </td>
            </tr>
            <tr>
              <td className="title">{'图片说明:'}</td>
              <td> <input type="file" /></td>
            </tr>
            <tr>
              <td className="title">{'文字介绍:'}</td>
              <td><textarea type="text" /></td>
            </tr>
          </table>
        </form>
      </div>
    )
  }
}


function mapStateToProps(state){
  return{
    explore:state.explore,
    user_tab:state.user_tab,
    pages:state.pages
  }
}

function mapActionToProps(dispatch){
  return{
    onChange:bindActionCreators(exploreAction,dispatch),
    pageChange:bindActionCreators(pageAction,dispatch),
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(ProjEditor);


