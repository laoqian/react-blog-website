/**
 * Created by yu on 2016/7/6..
 * 登录模块
 */



import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'


class Login extends Component {


  componentDidMount() {
    $('input').iCheck({
      checkboxClass: 'icheckbox_square-blue',
      radioClass:   'iradio_square-blue',
      increaseArea: '10%' // optional
    });
  }

  render() {

    return (

        <div className="login-box">
          <div className="login-logo">
            <a href="../../index2.html"><b>莲花湖畔</b></a>
          </div>

          <div className="login-box-body">
            <p className="login-box-msg">登录</p>

            <form action="../../index2.html" method="post">
              <div className="form-group has-feedback">
                <input type="email" className="form-control" placeholder="邮箱/账号"/>
                  <span className="glyphicon glyphicon-envelope form-control-feedback"/>
              </div>
              <div className="form-group has-feedback">
                <input type="password" className="form-control" placeholder="密码"/>
                  <span className="glyphicon glyphicon-lock form-control-feedback"/>
              </div>

              <div className="row">
                <div className="col-xs-8">
                  <div className="checkbox icheck">
                    <label>
                      <input type="checkbox" className=""/>记住密码
                    </label>
                  </div>
                </div>
                <div className="col-xs-4">
                  <button type="submit" className="btn btn-primary btn-block btn-flat">登录</button>
                </div>
              </div>
            </form>

            <a href="#">{'忘记密码?'}  </a>&nbsp;&nbsp;&nbsp;
            <a href="register.html" className="text-center">注册新账号</a>
          </div>
        </div>

    )
  }
}



Login.propTypes = {

};


function mapStateToProps(state){
  return{}
}

function mapActionToProps(dispatch){
  return{}
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(Login);

