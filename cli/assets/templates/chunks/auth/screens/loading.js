import React from 'react'
import { default as auth } from 'react-chunky-auth-chunk'

export default class LoadingScreen extends auth.screens.loading {

  constructor(props) {
    super(props)
    this.state = { ...this.state }
  }

  componentDidMount() {
    super.componentDidMount()
  }
}
