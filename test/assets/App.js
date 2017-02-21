import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const Screen = this.props.initialRoute.screen
    return (<div>
      <h1> Test App </h1>
      <Screen/>
      </div>)
  }
}
