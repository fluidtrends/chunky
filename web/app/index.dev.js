import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from '../src/core/App'
import { Core } from 'react-chunky'
import './global'

const main = (Component, route, redirect) => (<Core.AppContainer {...chunky.config}>
  <Component {...chunky.config} route={route} redirect={redirect} />
</Core.AppContainer>)

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      { main(Component) }
    </AppContainer>,
  document.getElementById('chunky'))
}

render(App)

if (module.hot) {
  module.hot.accept('../src/core/App', () => { render(App) })
}
