import React, { Component, PropTypes } from 'react'

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }
  getInputValue() {
    return this.refs.input.value;
  }


  renderInput(input){
    return(
      <span>
        {input.name}:
        <input type="text" placeholder={input.placeholder} defaultValue={input.value}/>
      </span>
    )
  }

  renderSelect(sel){
    return(
      <span>
        {sel.name}:
        <select name={sel.name} id="">
          {
            sel.op.map((option,key)=>(
              <option value={key}>{option.name}</option>
            ))
          }
        </select>
      </span>
    )
  }

  renderComponet(coms){
    return (coms.map(com=>{
      if(com.type=='input'){
        return this.renderInput(com)
      }else if(com.type=='select'){
        return this.renderSelect(com)
      }
    }))
  }

  handleOnClick(){
    this.props.search(this.getInputValue());
  }
  render() {
    return (
      <div>
        {this.renderComponet(this.props.coms)}
        <button onClick={this.handleOnClick}>
          确定
        </button>
      </div>
    )
  }
}


