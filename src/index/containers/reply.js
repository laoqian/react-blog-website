import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Article  from '../components/article'



class Reply extends Component {
  constructor(props){
    super()
  }

  render() {

    return (
      <div className="flex media-item">
        111111111
      </div>
    )
  }
}


Reply.propTypes = {
};


function mapStateToProps(state){
  return{
    article:state.article.recent_one
  }
}

function mapActionToProps(dispatch){
  return{
    dispatch
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Reply);

