import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'


class Login extends Component {
  render() {
    let index=0;
    return (
      <div>
        <span>用户名:</span>
        <input placeholder="用户名" addonBefore="用户名:"/>
        <span>密码:</span>
        <input placeholder="密码" />
        <input type="checkbox" placeholder="密码" />记住
        <button >登录</button>
      </div>
    )
  }
}
class Logout extends Component {
  render() {
    let index=0;
    return (
      <div>
        <button type="primary">退出</button>
      </div>
    )
  }
}


class Header extends Component {
  render() {
    let index=0,log_bar;
    if(this.props.log_state==true){
      log_bar = <Logout/>
    }else{
      log_bar = <Login/>
    }

    //header样式计算
    let style = this.props.style;
    let obj = {height:style.height+'px'};
    let str = "flex header flex-center ";
    if(style.class){
      str+=style.class;
    }

    console.log(str);

    return (
      <div style={obj} className={str}>
        <div className="flex media-item flex-between-row">
          <div>
            欢迎光临莲花湖畔
          </div>
          <div>
            {log_bar}
          </div>
        </div>
      </div>
    )
  }
}




Header.propTypes = {
  style: React.PropTypes.object
};


function mapStateToProps(state){
  return{
    style:state.website.header_style
  }
}

function mapActionToProps(dispatch){
  return{}
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Header);

