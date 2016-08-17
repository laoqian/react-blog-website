import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import Article  from '../components/article'
import Reply from './reply'


class Reading extends Component {
  constructor(props){
    super()
  }
  //componentWillMount (){
  //  let dispatch = this.props.dispatch;
  //  let id = this.props.id;
  //
  //  console.log('渲染阅读页面');
  //
  //}

  render() {
    if(!this.props.article){
      return (
        <div >
          正在读取新的文章...
        </div>
      )
    }
    return (
      <div className="flex media-item content">
        <Article article={this.props.article} link_show={false}/>
        <Reply/>
      </div>
    )
  }
}


Reading.propTypes = {
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
)(Reading);

