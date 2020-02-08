import React from 'react'
import { Screen } from '../../../../../../src'

export default class Loading extends Screen {

  constructor (props) {
    super(props)
    this.state = { progress: false }
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

  render() {
    return <div/>
  }

}
