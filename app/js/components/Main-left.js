import React, { Component, PropTypes } from 'react'

class MainLeft extends Component {

  render() {
    const mainMenu = this.props.mainMenu;
    return (
      <div className="main-left">
        <ul>{mainMenu.map(menu=><li>{menu}</li>)}</ul>
      </div>
    )
  }
}

MainLeft.propTypes = {
  mainMenu: PropTypes.array.isRequired
};



export default MainLeft;
