import React, { Component, PropTypes } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.id !== this.props.id) {
      this.setInputValue(nextProps.id);
    }
  }
  getInputValue() {
    return this.refs.input.value;
  }
  setInputValue(val) {
    this.refs.input.value = val;
  }

  handleOnClick(){
    this.props.search(this.getInputValue());
  }
  render() {
    return (
      <div>
        <span>输入需要查询的用户ID:</span>
        <input type="text"
               placeholder="用户ID"
               ref="input"
               defaultValue={this.props.id}/>
        <button onClick={this.handleOnClick}>
          确定
        </button>
      </div>
    )
  }
}

SearchBar.propTypes = {
  id: PropTypes.number.isRequired,
  search: PropTypes.func.isRequired
};

