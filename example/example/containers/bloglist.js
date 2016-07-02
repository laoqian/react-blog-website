import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Article  from '../components/article'



class Profile extends Component {

  render() {
    var art_list = this.props.art_list

    if(!art_list||art_list.length==0){
      return (
        <div className="left-box">
           等待加载文章列表.....
        </div>
      )
    }else{
      return (
        <div className="left-box">
          {
            art_list.map(art=>(
              <Article article={art}/>
            ))
          }
        </div>
      )
    }
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


class BlogList extends Component {

  render() {
    return (
      <div className="flex media-item">
        <Profile art_list ={this.props.art_list}/>
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
    path:state.web_path,
    art_list:state.art_list
  }
}

function mapActionToProps(dispatch){
  return{}
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(BlogList);

