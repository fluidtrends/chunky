import React, { Component } from 'react'

export default class AppContainer extends Component {

  constructor(props) {
    super(props)
  }

  get app () {
    return React.cloneElement(this.props.children)
  }

  componentDidMount() {
  }

  render() {
    return this.app
  }
}
