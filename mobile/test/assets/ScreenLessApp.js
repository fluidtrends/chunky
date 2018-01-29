import React, { Component } from 'react'
import { Errors, App } from '../..'

export default class ScreenLessApp extends App {

  constructor(props) {
    super(props)
  }

  get route () {
    var r = this.props.initialRoute
    delete r.screen
    return r
  }

  render() {
    return this.renderScene(this.route)
  }

}
