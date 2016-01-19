import React, { Component, PropTypes } from 'react'

export default class Explore extends Component {
  constructor(props) {
    super(props);
    this.handleOnClick = this.handleOnClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
  }
  getInputValue() {
    return this.refs.input.value;
  }
  handleOnClick(){
    this.props.search(this.getInputValue());
  }

  handleOnChange(e){
    this.value = e.target.value;
  }

  renderInput(input,key){
    return(
      <div key={key}>
        <span>
          {input.name}:
        </span>
        <input type="text"
               placeholder={input.placeholder}
               value={input.value}
               onChange={this.handleOnChange.bind(input)}/>
      </div>
    )
  }

  renderSelect(sel,key){
    return(
      <div key={key}>
        <span>
          {sel.name}:
        </span>
        <select name={sel.name}
                value={sel.value}
                onChange={this.handleOnChange.bind(sel)}>
          {
            sel.op.map((option)=>(
              <option key={option.id} value={option.id}>{option.name}</option>
            ))
          }
        </select>
      </div>
    )
  }

  renderComponet(coms){
    let i =0
    return (coms.map(com=>{
      if(com.type=='input'){
        return this.renderInput(com,`child${i++}`)
      }else if(com.type=='select'){
        return this.renderSelect(com,`child${i++}`)
      }
    }))
  }


  render() {
    return (
      <div className="explore">
        {this.renderComponet(this.props.coms)}
        <button onClick={this.handleOnClick}>
          确定
        </button>
      </div>
    )
  }
}


