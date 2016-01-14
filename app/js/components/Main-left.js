import React, { Component, PropTypes } from 'react'

class MainLeft extends Component {


  render() {
    const mainMenu = this.props.mainMenu;
    return (
      <div className="main-left">
        <ul>
          {mainMenu.Menus.map(menu=>
            <li>{menu}
              <ul>
                {mainMenu.subMenu[menu].map(sub=>
                  <li>{sub}</li>
                )}
              </ul>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

MainLeft.propTypes = {
  mainMenu: PropTypes.array.isRequired
};



export default MainLeft;
