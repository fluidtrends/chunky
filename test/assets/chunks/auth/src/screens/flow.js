import React, { Component } from 'react'
import { Core } from '../../../../../../src'

export default class Screen extends Core.Screen {

  constructor (props) {
    super(props)
    this.state = { progress: false }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  getAccountSuccess(data) {
    
  }

  getAccountError(data) {
    
  }

  renderData () {
    return <div>
        Main
    </div>
  }

}
