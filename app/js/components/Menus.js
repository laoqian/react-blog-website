import React, { Component, PropTypes } from 'react'


class Menus extends Component {
  constructor(props) {
    super(props);
  }

  onMenuClick(){
    this.props.onChange(1);
  }

  //renderMenu(menus){
  //  return  menus.map(menu=>{
  //    menu.change = this.props.onChange;
  //    console.log(`id ${menu.id} display:${menu.style.display}`);
  //    return(
  //      <div>
  //        <li onClick={this.onMenuClick.bind(menu)}
  //            style={menu.style}>
  //            {menu.name}
  //        </li>
  //        {this.renderMenu(menu.sub)}
  //      </div>
  //    )
  //  });
  //}

  render(){
    const menus = this.props.menu;
    console.log(1111);
    return (
      <ul>
        {
          menus.map(menu=>(
            <div>
              <li onClick={this.onMenuClick.bind(this)} style={menu.style}>{menu.name}</li>
              {menu.sub.map(sub=>(
                <li onClick={this.onMenuClick.bind(this)} style={sub.style}>
                  {sub.name}
                </li>
              ))}
            </div>
            ))
        }
      </ul>
      )
  }
}

Menus.propTypes = {
  menu: PropTypes.array.isRequired,
  onChange:PropTypes.func.isRequired
};


export default Menus;
