/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Data, Core, Errors } from '../..'
import SimpleApp from '../assets/SimpleApp'
import App from '../assets/App'
import appConfig from '../assets/chunky'
import { operations } from 'firebaseline'

savor

.add('should not render an empty app container', (context, done) => {
  const props = { info: { analytics: {} } }
  context.expect(() => {
    context.shallow(<Core.AppContainer {...props} />)
  }).to.throw(Errors.UNABLE_TO_LOAD_APP().message)

  done()
})

.add('should render a simple app without any properties', (context, done) => {
    const props = { info: { analytics: {} } }
    context.expect(() => {
    context.shallow(<Core.AppContainer {...props}>
      <SimpleApp />
    </Core.AppContainer>)
  }).to.throw(Errors.UNABLE_TO_LOAD_CHUNKS().message)
  done()
})

.add('should create an app and have a valid lifecyle', (context, done) => {
    const props = { env: "production", info: { analytics: {} } }
  // Start off with an empty dom
  savor.addDom('<!doctype html><html><body></body></html>')

  // Let's mount the app
  context.spy(SimpleApp.prototype, 'componentDidMount')
  context.spy(SimpleApp.prototype, 'render')

  const container = context.mount(<Core.AppContainer {...appConfig}  {...props}>
    <SimpleApp {...appConfig} />
  </Core.AppContainer>)

  // Let's make sure the component hierarchy is as expected
  context.expect(container.length).to.equal(1)
  context.expect(container.childAt(0).name()).to.equal('Provider')

  // Make sure the app is actually mounted and the lifecycle is initiated
  context.expect(SimpleApp.prototype.componentDidMount.calledOnce).to.be.true
  context.expect(SimpleApp.prototype.render.calledOnce).to.be.true

  // Let's clean up the observers
  SimpleApp.prototype.componentDidMount.restore()
  SimpleApp.prototype.render.restore()

  // And, we're looking good
  done()
})

.add('should create a valid screen instance', (context, done) => {
  // Start off with an empty dom
  savor.addDom('<!doctype html><html><body></body></html>')
  const props = { env: "production", info: { analytics: {} } }

  const stub = context.stub(Core.Screen.prototype, 'setState', () => ({}))

  // Let's mount the app
  const container = context.mount(<Core.AppContainer {...appConfig} {...props}>
    <App {...appConfig} />
  </Core.AppContainer>)

  const wrapper = container.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0)
  const screen = wrapper.instance()

  context.expect(screen.entities).to.exist
  context.expect(wrapper.props().startOperation).to.exist
  stub.restore()
  
  // And, we're looking good
  done()
})

.run('App Rendering')
