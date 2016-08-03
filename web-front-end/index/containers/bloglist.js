import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router'
import Article  from '../components/article'
import * as action_type from  '../action_type'


class ArticleList extends Component {

  render() {
    let art_list = this.props.art_list
    let index=0;

    return (
      <div className="left-box">
        {
          art_list.map(art=>(
            <Article article={art} key={index++} link_show={true}/>
          ))
        }
      </div>
    )

  }
}



class Menus extends Component {
  render() {
    let hots = this.props.hots
    let index =0;

    return (
      <div className="right-box">
        <div className="flex box-raduis">
          <h2 className="box-title">
            最热文章
          </h2>
          <ul >
            {
              hots.map(hot=>(
                <li key={index++}>
                  <Link to={'/reading/'+hot.id}>{hot.title}</Link>
                </li>
              ))
            }
          </ul>
        </div>
        <div className="flex box-raduis">
          <h2 className="box-title">
            关于我
          </h2>
          <img src="./res/yu-small.jpg" alt=""/>
          <ul className="resume">
            <li><Link to="/">个人简介</Link></li>
            <li>
              <span >{'文章:'+this.props.article_total+'  '}</span>
              <Link to="/">留言</Link>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}


class BlogList extends Component {

  componentWillMount(){
    let dispatch = this.props.dispatch;
    dispatch({
      type:action_type.LOAD_HOME_PAGE_DATA,
      uri:'home_page_data_get',
      ajax_type:'get'
    });
  }

  render() {
    if(this.props.home_page_data===undefined){
      return (
        <div className="media-item">
          等待加载首页数据...
        </div>
      )
    }

    return (
      <div className="media-item">
        <div className="flex">
          <ArticleList art_list ={this.props.home_page_data.recent_tweenty}/>
          <Menus hots={this.props.home_page_data.recent_ten_hots} article_total={this.props.home_page_data.article_total}/>
        </div>
      </div>
    )
  }
}


//BlogList.propTypes = {
//  art_list: PropTypes.array.isRequired,
//  hots_list: PropTypes.array.isRequired
//};


function mapStateToProps(state){
  return{
    home_page_data:state.article.home_page_data
  }
}

function mapActionToProps(dispatch){
  return{dispatch}
}

export default connect(
  mapStateToProps,
  mapActionToProps
)(BlogList);

