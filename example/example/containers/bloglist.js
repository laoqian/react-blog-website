import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'



class Article extends Component {

  render() {
    return (
      <div className="art">
        <h2>
          {art.title}
        </h2>
        <p>
          {art.content}
        </p>
        <p>
          <Link to="/article">继续阅读全文&raquo;</Link>
        </p>
        <div className="art-info">
          <span>{"作者:"+art.author}</span>
          <span>{"发表于:"+art.time}</span>
          <span>{"浏览:"+art.skim}</span>
          <span>{"回复:"+art.reply}</span>
        </div>
      </div>
    )
  }
}

class Profile extends Component {

  render() {
    let arts = this.props.arts
    return (
      <div className="left-box">
        {
          arts.map(art=>(
            <Article art={art}/>
          ))
        }
      </div>
    )
  }
}



class Menus extends Component {

  render() {
    let cls = this.props.cls

    return (
      <div className="right-box">
        <div className="flex box-raduis">
          <h2 className="box-title">
            文章分类
          </h2>
          <ul >
            {
              cls.map(cl=>(
                <li>
                  <Link to="/">{cl}</Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="flex box-raduis">
          <h2 className="box-title">
            关于我
          </h2>
          <img src="./res/yu.jpg" alt=""/>
          <ul>
            <li><Link to="/">个人简介</Link></li>
            <li>
              <span>{'文章:'+'122  '}</span>
              <Link to="/">留言</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

var clas = ['个人随想','演员的自我修养','做一个有逼格的人','如何当一个合格的流氓','演员的自我修养']
var art = {
  title:'我的个人随想',
  content:'这就是我的第一篇文章',
  time:'2016年3月21日15:08',
  author:'于其先',
  skim:100,
  reply:33
}


var arts = [art,art,art,art,art,art,art]

class BlogList extends Component {

  render() {
    return (
      <div className="flex media-item">
        <Profile arts ={arts}/>
        <Menus cls={clas}/>
      </div>
    )
  }
}


BlogList.propTypes = {
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
)(BlogList);

