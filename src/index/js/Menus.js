import React, { Component, PropTypes } from 'react'


class Menus extends Component {
  constructor(props) {
    super(props);
  }

  onMenuClick(){
    this.change(this.id);
  }

  renderMenu(menus){
    return  menus.map(menu=>{
      return(
        <div key={menu.id}>
          <li onClick={this.onMenuClick.bind({change:this.props.onChange,id:menu.id})}
              style={menu.style}>
              {menu.prefix}{menu.name}
          </li>
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
