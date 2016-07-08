import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import { reduxForm } from 'redux-form'

export const fields = [ 'username', 'password','remember'];

class Login extends Component {


  render() {
    const {
      fields: { username, password,remember},
      handleSubmit,
      submitting
      } = this.props

    return (
      <form className="flex login-bar" onSubmit={handleSubmit}>
        <span>用户名:</span>
        <input type="text" placeholder="用户名" {...username}/>
        <span>密码:</span>
        <input type="password" placeholder="密码" {...password} />
        <input type="checkbox" placeholder="密码" {...remember}/>记住
        <button type="button" className="btn bg-purple btn-flat btn-xs"  disabled={submitting}>登录</button>
      </form>
    )
  }
}

Login.propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetForm: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired
}

var LoginForm  = reduxForm({
    form: 'login',
    fields
})(Login)

class Logout extends Component {
  render() {
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
      log_bar = <LoginForm/>
    }

    //header样式计算
    let style = this.props.style;
    let obj = {height:style.height+'px'};
    let str = "flex header flex-center ";
    if(style.class){
      str+=style.class;
    }

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

