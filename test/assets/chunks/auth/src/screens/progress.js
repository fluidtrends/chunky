import React, { Component } from 'react'
import { Core } from '../../../../../..'

export default class Screen extends Core.Screen {

  constructor (props) {
    super(props)
    this.state = { progress: true }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  renderDataError () {
    return <div />
  }

  reloadMe () {
    this.transitions.test()
  }

  renderDataLoading () {
    return <div />
  }

  renderProgress() {
    return <div/>
  }

  renderDataDefaults () {
    return <div />
  }

  renderData () {
    return <div />
  }

}
