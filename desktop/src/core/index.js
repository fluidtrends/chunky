import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { App, Screen } from 'react-dom-chunky'
import { Core } from 'react-chunky'
import { ipcRenderer } from 'electron'
import './global'

class Main extends Component {

  constructor (props) {
    super(props)
    this.state = {}
  }

  componentDidMount () {
    ipcRenderer.on('refresh', (event, { session }) => {
      this.setState({ session })
    })
  }

  get session () {
    return this.state.session || this.props.session
  }

  render () {
    const config = Object.assign({}, chunky.config, {
      session: this.session,
      timestamp: `${Date.now()}`
    })

    var appConfig = Object.assign({}, config)
    delete appConfig.chunks

    return <Core.AppContainer {...config}>
      <App {...appConfig} />
    </Core.AppContainer>
  }
}

const start = (session) => {
  ReactDOM.render(<Main session={session} />, document.getElementById('chunky'))
}

ipcRenderer.on('start', (event, { session }) => {
  start(session)
})
