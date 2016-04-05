import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

class Article extends Component {
  constructor(props){
    super()
    
  }
 

  render() {
    return (
      <div className="flex media-item editor">
			这是我的个人blog
      </div>
    )
  }
}


Article.propTypes = {
  path: PropTypes.array.isRequired,
};


function mapStateToProps(state){
  return{
    id:'ueditor'
  }
}

function mapActionToProps(dispatch){
  return{
  
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Article);

