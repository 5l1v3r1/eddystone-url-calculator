import React, { Component, PropTypes } from 'react'
import Explore from './Explore'
import Command from './Command'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
        url: ''
      }
    this.processUrl = this.processUrl.bind(this)
    this.handleDismissClick = this.handleDismissClick.bind(this)
  }

  handleDismissClick(e) {
    this.props.resetErrorMessage()
    e.preventDefault()
  }

  processUrl(nextVal) {
    this.setState({
      url: nextVal
    })
  }

  renderErrorMessage() {
    const { errorMessage } = this.state
    if (!errorMessage) {
      return null
    }

    return (
      <p style={{ backgroundColor: '#e99', padding: 10 }}>
        <b>{errorMessage}</b>
        {' '}
        (<a href="#"
            onClick={this.handleDismissClick}>
          Dismiss
        </a>)
      </p>
    )
  }

  render() {
    return (
      <div>
        <h2>Eddystone URL command calculator</h2>
        <Explore process={this.processUrl} />
        <hr />
        {this.renderErrorMessage()}
        <Command url={this.state.url}/>
      </div>
    )
  }
}
