import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Footer extends Component {

  render() {
    return (
      <div className="flex media-item footer">
        <div>于其先得网络日志
        联系我|858385135@qq.com</div>
      </div>
    )
  }
}


Footer.propTypes = {
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
)(Footer);

