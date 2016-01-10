import React, { Component, PropTypes } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.value !== this.props.value) {
      this.setInputValue(nextProps.value);
    }
  }
  getInputValue() {
    return this.refs.input.value;
  }
  setInputValue(val) {
    this.refs.input.value = val;
  }

  handleOnClick(){
    let value = this.getInputValue();
    alert(value);
    this.props.onChange(this.getInputValue());
  }
  render() {
    return (
      <div>
        <span>输入需要查询的用户ID:</span>
        <input type="text"
               placeholder="用户ID"
               ref="input"
               defaultValue={this.props.value}
               value="1234455"/>
        <button onClick={this.handleOnClick}>
          确定
        </button>
      </div>
    )
  }
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

