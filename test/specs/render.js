import React, { Component } from 'react'
import savor from 'react-savor'
import { Provider } from 'react-redux'
import { Core, Errors } from '../..'
import App from '../assets/App'
import appConfig from '../assets/chunky'

savor.add("should not render an empty app container", (context, done) => {
  context.expect(() => {
    const container = context.shallow(<Core.AppContainer/>)
  }).to.throw(Errors.UNABLE_TO_LOAD_APP().message)

  done()
}).

add("should render a simple app without any properties", (context, done) => {
  context.expect(() => {
    const container = context.shallow(<Core.AppContainer>
      <App/>
    </Core.AppContainer>)
  }).to.throw(Errors.UNABLE_TO_LOAD_CHUNKS().message)
  done()
}).

add("should create an app with some properties", (context, done) => {
  // Start off with an empty dom
  savor.addDom('<!doctype html><html><body></body></html>')

  // Create some test properties
  const config = appConfig

  // Let's mount the app
  context.spy(App.prototype, 'componentDidMount');
  context.spy(App.prototype, 'render');
  const container = context.mount(<Core.AppContainer {...config}>
    <App {...config } />
  </Core.AppContainer>)

  // Let's make sure the component hierarchy is as expected
  context.expect(container.length).to.equal(1)
  context.expect(container.childAt(0).name()).to.equal("h1")

  // Make sure the app is actually mounted and the lifecycle is initiated
  context.expect(App.prototype.componentDidMount.calledOnce).to.be.true
  context.expect(App.prototype.render.calledOnce).to.be.true

  // Let's clean up the observers
  App.prototype.componentDidMount.restore()
  App.prototype.render.restore()

  // And, we're looking good
  done()
}).

run("App Rendering")
