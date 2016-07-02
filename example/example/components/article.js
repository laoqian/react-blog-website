import { Component, PropTypes } from 'react'
import {Link} from 'react-router'

class Article extends Component {

  render() {
    let article = this.props.article;

    return (
      <div className="art">
        <h2>
          {article.title}
        </h2>
        <div dangerouslySetInnerHTML={{__html:article.content}}></div>
        <p>
          <Link to={'/reading/'+article.id}>继续阅读全文&raquo;</Link>
        </p>
        <div className="art-info">
          <span>{"作者:"+article.author}</span>
          <span>{"发表于:"+article.createtime}</span>
          <span>{"浏览:"+article.skim}</span>
          <span>{"回复:"+article.reply}</span>
        </div>
      </div>
    )
  }
}

export default Article;