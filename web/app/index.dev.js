import React from 'react'
import ReactDOM from 'react-dom'
import { hot, atom AppContainer } from 'react-hot-loader'
import App from '../src/core/App'
import { Core } from 'react-chunky'
import './global'

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Core.AppContainer {...chunky.config}>
        <Component {...chunky.config} />
      </Core.AppContainer>
    </AppContainer>,
  document.getElementById('chunky'))
}

if (module.hot) {
  module.hot.accept()
  render(App)
} else {
  render(App)
}
