import React, { Component, PropTypes } from 'react'
import {Link} from 'react-router'


class Menus extends Component {
  constructor(props) {
    super(props);
  }

  onMenuClick(){
    this.change(this.menu);
  }

  renderMenu(menus){
    let List
    let index =0;
    return  menus.map(menu=>{

      if(!menu.link || menu.sub.length>0){
        List =
          <li onClick={this.onMenuClick.bind({change:this.props.onChange,menu})}
              style={menu.style}  key={index++} >
            {menu.prefix}{menu.name}

          </li>
      }else{
        List =
          <li style={menu.style}>
            <Link className="link" to={menu.link} key={index++} >{menu.prefix}{menu.name}  </Link>
          </li>
      }

      return(
        <div key={menu.id}>
          {List}
          {this.renderMenu(menu.sub)}
        </div>
      )
    });
  }

  render(){
    const menus = this.props.menu;
    return (
      <ul>
        {this.renderMenu(menus)}
      </ul>
      )
  }
}

Menus.propTypes = {
  menu: PropTypes.array.isRequired,
  onChange:PropTypes.func.isRequired
};


export default Menus;
