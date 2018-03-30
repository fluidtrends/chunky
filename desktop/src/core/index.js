import React from 'react'
import ReactDOM from 'react-dom'
import 'require-context/register'
import { AppContainer } from 'react-hot-loader'
import { App } from 'react-dom-chunky'
import { Core } from 'react-chunky'
import './global'

const render = () => {
  ReactDOM.render(
    <AppContainer>
      <Core.AppContainer {...chunky.config}>
        <App {...chunky.config} />
      </Core.AppContainer>
    </AppContainer>,
  document.getElementById('chunky'))
}

render()

if (module.hot) {
  module.hot.accept(render)
}
