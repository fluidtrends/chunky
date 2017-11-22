import React, { Component } from 'react'

export default class App extends Component {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
  }

  render() {
    const auth = this.props.chunks.auth
    const loading = auth.routes.loading
    const LoadingScreen = loading.screen
    const screenProps = { chunkName: 'auth', startOperationsOnMount: true, transitions: [{ name: 'test'}] }

    return (<div>
      <h1> App </h1>
      <LoadingScreen {...screenProps}/>
      </div>)
  }
}
