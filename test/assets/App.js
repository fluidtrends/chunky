import React, { Component } from 'react'

export default class App extends Component {
  componentDidMount () {
  }

  render () {
    const auth = this.props.chunks.auth
    const loading = auth.routes.loading
    const LoadingScreen = loading.screen
    const transition = {
      name: 'test',
      type: 'push'
    }
    const screenProps = { chunkName: 'auth', startOperationsOnMount: true, transitions: [transition] }

    return (<div>
      <h1> App </h1>
      <LoadingScreen {...screenProps} />
    </div>)
  }
}
