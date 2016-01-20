/**
 * Created by gg on 2016/1/19.
 */
import React, { Component, PropTypes } from 'react'


class Table extends Component {
  constructor(props) {
    super(props);
  }

  render(){
    const table = this.props.table;
    return (
      <table>
        <tbody>
        {table.map(rows=>(<tr>
          {rows.map(col=>(
            <td>
              {col}
            </td>))}

          </tr>
          ))}
        </tbody>
      </table>
    )
  }
}



export default Table;
