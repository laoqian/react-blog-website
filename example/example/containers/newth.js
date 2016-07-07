import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {art_post_action} from '../actions/action'
import { bindActionCreators } from 'redux';

class NewTheme extends Component {
  constructor(props){
    super()

    this.post_art = this.post_art.bind(this)
  }
  componentDidMount() {
      CKEDITOR.replace( this.props.id, {
          customConfig: '/ckeditor/config.js'
      });
  }

  post_art(){
    let title   =  this.refs.new_title.value;
    let content  = CKEDITOR.instances[this.props.id].getData();

    if(title =='' || content==''){
      return;
    }

    this.props.art_post_action(title,content)
  }

  render() {
    let style = {
      height:'500px'
    }

    return (
      <div className="flex media-item editor content">
        <div className="flex title group-item">
          <span>主题:</span>
          <input ref="new_title" type="text" placeholder="111"/>
        </div>

          <textarea id={this.props.id} cols="40" rows="2" ></textarea>
        <div>
          <button onClick={this.post_art}>发表主题</button>
        </div>
      </div>
    )
  }
}


NewTheme.propTypes = {
  path: PropTypes.array.isRequired,
};


function mapStateToProps(state){
  return{
    id:'ueditor'
  }
}

function mapActionToProps(dispatch){
  return{
    art_post_action:bindActionCreators(art_post_action,dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(NewTheme);

