import React, { Component } from 'react'
import { Core } from '../../../../../..'

export default class LoadingScreen extends Core.Screen {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    super.componentDidMount()
  }

  renderDataError() {
    return <div/>
  }

  renderDataLoading() {
    return <div/>
  }

  renderDataDefaults() {
    return <div/>
  }

  renderData() {
    return <div/>
  }

}
