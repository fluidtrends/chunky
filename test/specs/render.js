import React, { Component } from 'react'
import savor from 'react-savor'
import { Provider } from 'react-redux'
import { AppContainer } from '../..'
import { default as App } from '../assets/App'

savor.add("should not render an empty app container", (context, done) => {
    context.expect(() => {
      const container = context.shallow(<AppContainer/>)
    }).to.throw(Error)
    done()
}).

add("should render a simple app without any properties", (context, done) => {
  // Render it without passing any properties
  const container = context.shallow(<AppContainer><App/></AppContainer>)

  // Let's make sure the component hierarchy is as expected
  context.expect(container.length).to.equal(1)
  context.expect(container.at(0).name()).to.equal("Provider")
  context.expect(container.childAt(0).name()).to.equal("App")

  // And let's also make sure the app does not have any properties
  context.expect(container.childAt(0).props()).to.be.empty
  done()
}).

add("should render a simple app with some properties", (context, done) => {
  // We mount the app but with some properties
  const container = context.shallow(<AppContainer><App test="test"/></AppContainer>)

  // Let's make sure we find those properties in the mounted app
  context.expect(container.childAt(0).props().test).to.equal('test')
  done()
}).

add("should mount a simple app without any properties", (context, done) => {
  // Start off with an empty dom
  savor.addDom('<!doctype html><html><body></body></html>')

  // Let's mount the app
  context.spy(App.prototype, 'componentDidMount');
  const container = context.mount(<AppContainer><App/></AppContainer>)

  // Make sure the app is actually mounted
  context.expect(App.prototype.componentDidMount.calledOnce).to.be.true

  // Clean up the observer
  App.prototype.componentDidMount.restore()

  // Woohoo
  done()
}).

add("should create an app with some properties", (context, done) => {
  // Start off with an empty dom
  savor.addDom('<!doctype html><html><body></body></html>')

  // Create some test properties
  const config = {
    apiUrl: "localhost"
  }

  // Let's mount the app
  context.spy(App.prototype, 'componentDidMount');
  context.spy(App.prototype, 'render');
  const container = context.mount(<AppContainer><App config={ config } /></AppContainer>)

  // Make sure the app is actually mounted and the lifecycle is initiated
  context.expect(App.prototype.componentDidMount.calledOnce).to.be.true
  context.expect(App.prototype.render.calledOnce).to.be.true

  // Let's clean up the observers
  App.prototype.componentDidMount.restore()
  App.prototype.render.restore()

  // And, we're looking good
  done()
}).

run("Rendering")
