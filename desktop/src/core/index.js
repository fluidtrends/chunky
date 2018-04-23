import React from 'react'
import ReactDOM from 'react-dom'
import { App } from 'react-dom-chunky'
import { Core } from 'react-chunky'
import './global'

const render = () => {
  ReactDOM.render(
    <Core.AppContainer {...chunky.config}>
      <App {...chunky.config} />
    </Core.AppContainer>,
  document.getElementById('chunky'))
}

render()

if (module.hot) {
  module.hot.accept(render)
}
