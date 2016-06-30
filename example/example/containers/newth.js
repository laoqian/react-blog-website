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
    if(this.editor instanceof UE.ui.Editor){
      this.editor.destory()
    }
    this.editor = new UE.ui.Editor();
    this.editor.render(this.props.id);
  }

  post_art(){
    let title   =  this.refs.new_title.value;
    let content = this.editor.getContent();

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
      <div className="flex media-item editor">
        <div className="flex title group-item">
          <span>主题:</span>
          <input ref="new_title" type="text" placeholder="111"/>
        </div>
          <script id={this.props.id} style={style} name="content" type="text/plain"/>
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

