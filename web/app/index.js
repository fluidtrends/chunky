import React from 'react'
import ReactDOM from 'react-dom'
import ReactDOMServer from 'react-dom/server'
import App from '../src/core/App'
import { Core } from 'react-chunky'
import './global'

const main = (route, redirect) => (<Core.AppContainer {...chunky.config}>
    <App {...chunky.config} route={route} redirect={redirect} />
</Core.AppContainer>)

if (!__DOM) {
  ReactDOM.hydrate(main(chunky.route, true), document.getElementById('chunky'))
}

export function renderStaticPage (route) {
  return new Promise((resolve, reject) => {
    try {
      const html = ReactDOMServer.renderToString(main(route))
      resolve(html)
    } catch (e) {
      reject(e)
    }
  })
}

