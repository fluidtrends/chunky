import React from 'react'
import ReactDOM from 'react-dom'
import { hot, AppContainer } from 'react-hot-loader'
import { App } from 'react-dom-chunky'
import { Core } from 'react-chunky'
import { ipcRenderer } from 'electron'
import './global'

const render = (Component, config) => {
  var appConfig = Object.assign({}, config)
  delete appConfig.chunks
  ReactDOM.render(
    <AppContainer>
      <Core.AppContainer {...config} autoRefresh>
        <Component {...appConfig} autoRefresh />
      </Core.AppContainer>
    </AppContainer>,
  document.getElementById('chunky'))
}

const start = (session) => {
  if (module.hot) {
    require('./global')
    module.hot.accept()
    render(App, Object.assign({}, chunky.config, { session, timestamp: `${Date.now()}` }))
  } else {
    render(App, Object.assign({}, chunky.config, { session, timestamp: `${Date.now()}` }))
  }
}

ipcRenderer.on('start', (event, { session }) => {
  start(session)
})
