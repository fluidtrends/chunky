import React, { Component } from "react"
import ReactDOM from "react-dom"
import { Core } from 'react-chunky'
import 'antd/dist/antd.less'
import './index.less'

import '../app/global'
import App from './App'

const render = (Component, config) => {
  var appConfig = Object.assign({}, config)
  delete appConfig.chunks
  ReactDOM.render(<Core.AppContainer {...config} autoRefresh>
        <Component {...appConfig} autoRefresh />
  </Core.AppContainer>, 
  document.getElementById('chunky'))
}

render(App, chunky.config)
