/**
 * Created by gg on 2016/1/20.
 */
import React, { Component, PropTypes } from 'react'


class Menus extends Component {
  constructor(props) {
    super(props);
  }
  onTurnPage(){
    this.pageChange(this.page)
  }
  render(){
    let style={
      display:'inline'
    };
    let i =0;
    let cur  = this.props.pages.cur
    let total  = this.props.pages.total
    let menus  = this.props.pages.menu_num
    let start  = 1

    if(total<=menus){
      menus = total
    }else{
      let div = parseInt(menus/2)
      if(cur>div) {
        start = cur - div
        if (start + menus > total) {
          start = total - menus+1
        }
      }
    }

    let list =[];
    for(i=0;i<menus;i++){
        list.push(
          <li style={style} >
            <button  className={i+start==cur?'pg-sel':''}
                     onClick={this.onTurnPage.bind({pageChange:this.props.pageChange,page:start+i})}>
              {start+i}
            </button>
          </li>
        )
    }

    return (
      <div className='pages'>
        <span>
          总共{this.props.pages.total}页，当前第{this.props.pages.cur}页。
        </span>
        <button className={this.props.pages.cur==1?'hidden':''}
                onClick={this.onTurnPage.bind({pageChange:this.props.pageChange,page:'pre-page'})}>
          上一页
        </button>
        <ul style={style}>
          {list}
        </ul>
        <button className={this.props.pages.cur==this.props.pages.total?'hidden':''}
                onClick={this.onTurnPage.bind({pageChange:this.props.pageChange,page:'next-page'})}>
          下一页
        </button>
      </div>
    )
  }
}

Menus.propTypes = {
  menu: PropTypes.array.isRequired,
  onChange:PropTypes.func.isRequired
};


export default Menus;
