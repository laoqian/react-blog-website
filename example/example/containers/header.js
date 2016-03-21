import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

class Header extends Component {

  render() {
    return (
      <div className="flex media-item header">
        <div>
          {
            this.props.path.map(path=>(
              <label>{path}&raquo;</label>
            ))
          }
        </div>
        <a Link="art-post">发表</a>
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

