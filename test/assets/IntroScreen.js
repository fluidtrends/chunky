import React, { Component } from 'react'
import { retrieveAuthToken } from '../..'

class IntroScreen extends Component {

  constructor(props) {
    super(props)

    this.state = { }
  }

  componentDidMount() {
  }

  render () {
    return (
      <div>
        <h1> INTRO </h1>
      </div>
    )
  }
}

export default IntroScreen
