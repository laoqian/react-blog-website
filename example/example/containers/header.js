import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'

class Header extends Component {

  render() {
    return (
      <div className="flex media-item header">
        <div>
          {
            this.props.path.map(path=>(
              <label><Link to={path.link}>{path.name}</Link>&raquo;</label>
            ))
          }
        </div>
        <Link to="art-post">发表</Link>
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

