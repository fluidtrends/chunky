import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount () {
  }

  render () {
    const auth = this.props.chunks.auth
    const loading = auth.routes.loading
    const LoadingScreen = loading.screen

    return (<div>
        <h1> App </h1>
       <LoadingScreen />
     </div>)
  }
}
