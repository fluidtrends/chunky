/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { App } from '../../../src'
import { Data, Core, Errors } from 'react-chunky'
import appConfig from '../../assets/chunky'
import { JSDOM } from 'jsdom'

savor

.add('should not to render the web app without properties', (context, done) => {
  const props = { info: { analytics: {} } }
  context.expect(() => {
        context.shallow(<Core.AppContainer {...props}>
          <App />
        </Core.AppContainer>)
      }).to.throw(Errors.UNABLE_TO_LOAD_CHUNKS().message)
  done()
})

.add('should create a web app and have a valid lifecyle', (context, done) => {
  context.spy(App.prototype, 'componentDidMount')
  context.spy(App.prototype, 'render')

  const container = context.mount(<Core.AppContainer {...appConfig}>
    <App {...appConfig} />
  </Core.AppContainer>)

  // And, we're looking good
  App.prototype.componentDidMount.restore()
  App.prototype.render.restore()
  done()
})

.add('should handle an error in retrieving a user account', (context, done) => {
  const stub = context.stub(global.storage, 'getItem').callsFake(((key, callback) => callback(null, null)))

  const container = context.mount(<Core.AppContainer {...appConfig}>
    <App {...appConfig} />
  </Core.AppContainer>)

  // And, we're looking good
  stub.restore()
  done()
})

.add('should retrieve a cache user account', (context, done) => {
  const stub = context.stub(global.storage, 'getItem').callsFake(((key, callback) => callback(null, { username: "chunky" })))
  
  const container = context.mount(<Core.AppContainer {...appConfig}>
    <App {...appConfig} />
  </Core.AppContainer>)

  // And, we're looking good
  stub.restore()
  done()
})

.add('should login', (context, done) => {
  const stub = context.stub(global.storage, 'getItem').callsFake(((key, callback) => callback(null, { username: "chunky" })))

  context.spy(App.prototype, 'componentDidMount')
  context.spy(App.prototype, 'render')

  const container = context.mount(<Core.AppContainer {...appConfig}>
    <App {...appConfig} />
  </Core.AppContainer>)

  // And, we're looking good
  App.prototype.componentDidMount.restore()
  App.prototype.render.restore()
  stub.restore()
  done()
})

.run('[Web] App Rendering')
