import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'



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
          <a href="#">继续阅读全文&raquo;</a>
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
        <ul>
          {
            cls.map(cl=>(
              <li>
                {cl}
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

var clas = ['个人随想','演员的自我修养','演员的自我修养','演员的自我修养','演员的自我修养']
var art = {
  title:'我的个人随想',
  content:'这就是我的第一篇文章',
  time:'2016年3月21日15:08',
  author:'于其先',
  skim:100,
  reply:33,
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

