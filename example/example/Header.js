import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Header extends Component {

  render() {
    return (
      <div className="media-item header">
        <div>
          <i className="icon-flag"></i>
          欢迎使用木鱼后台管理系统
          {
            this.props.path.map(path=>(
            <span>
              {path} ss
            </span>
            ))
          }
        </div>
      </div>
    )
  }
}


Header.propTypes = {
  path: PropTypes.array.isRequired,
};


function mapStateToProps(state){
  return{
    path:state.web_path
  }
}

function mapActionToProps(dispatch){
  return{}
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Header);

