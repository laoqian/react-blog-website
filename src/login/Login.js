/**
 * Created by gg on 2016/1/26.
 */
import React, { Component, PropTypes } from 'react'


class Login extends Component {
  constructor(props) {
    super(props);
  }



  render(){
    return (
      <form className="login" method="post">
        <div>
          <span>用户名:</span>
          <input type="text" name="account" value="yuqixian"/>
        </div>
        <div>
          <span>密&nbsp;码:</span>
          <input type="text" name="pwd" value="123456" />
        </div>
        <div>
          <span>&nbsp;&nbsp;&nbsp;</span>
          <input type="submit" value="登录"/>
        </div>
      </form>
  )}
}



export default Login;
