import React, { Component, PropTypes } from 'react'

export default class Explore extends Component {

  constructor(props) {
     super(props)
     this.handleChange = this.handleChange.bind(this)
     this.handleSubmit = this.handleSubmit.bind(this)
     this.state = {
        url: ''
     }

  }

  handleChange(e){
    this.setState({
      url: e.target.value
    })
  } 

  handleSubmit(e){
    if(e.keyCode === 13){
      this.props.process(this.state.url);
//      this.setState({
//        url: ''
//      });
    }
  }

  render(){
    return (
      <div>
        <input type="text" value={this.state.url} placeholder="http://webgazer.org" onKeyDown={this.handleSubmit} onChange={this.handleChange} />
      </div>
    )
  }
};

