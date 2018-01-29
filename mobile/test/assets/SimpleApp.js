import React, { Component } from 'react'
import { Errors, App } from '../..'

export default class SimpleApp extends App {

  constructor(props) {
    super(props)
    this.configureScene(this.props.initialRoute)
    this.configureScene(this.route)
  }

  get route () {
    return Object.assign({ animation: "PushFromRight" }, this.props.initialRoute)
  }

  render() {
    super.render()
    return this.renderScene(this.props.initialRoute)
  }

}
