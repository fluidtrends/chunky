import React, { Component } from 'react'
import { default as IntroScreen } from './IntroScreen'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    return (<div>
      <h1> Test App </h1>
      <IntroScreen config = {this.props.config}/>
      </div>)
  }
}
