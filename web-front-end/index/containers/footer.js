import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class Footer extends Component {

  render() {
    return (
      <div className="flex media-item footer">
        <div>
          {this.props.time}|联系我:858385135@qq.com
        </div>
      </div>
    )
  }
}


Footer.propTypes = {
  //path: PropTypes.array.isRequired,
};


function mapStateToProps(state){
  return{
    time:state.time
  }
}

function mapActionToProps(dispatch){
  return{}
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Footer);

