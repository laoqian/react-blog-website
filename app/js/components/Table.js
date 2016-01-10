import React, { Component, PropTypes } from 'react'

class TableComponent extends Component {

  render() {
    const user = this.props.user;
    return (
      <table>
        <tbody>
          {user.map(items=>
            <tr>
              <td>{items}</td>
            </tr>
          )}
        </tbody>
      </table>
    )
  }
}

export default TableComponent;
