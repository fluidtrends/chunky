import React from 'react'
import savor from 'react-native-savor'
import { AppRegistry, Navigator } from 'react-native'
import { Data, Core } from 'react-chunky'
import { renderApp, App, Errors } from '../..'
import config from '../assets/chunky'
import AppContainer from '../assets/AppContainer'
import SimpleApp from '../assets/SimpleApp'
import ScreenLessApp from '../assets/ScreenLessApp'

savor.add("should register an app", (context, done) => {
  // Inject a mock dom
  savor.addDom('<!doctype html><html><body></body></html>')

  context.stub(AppRegistry, "registerComponent", (name, main) => {
    const app = main()
    const container = context.mount(<app/>)
    done()
  })
  renderApp(config)

  AppRegistry.registerComponent.restore()
}).

add("should not render an app without any routes", (context, done) => {
  const main = (<Core.AppContainer {...config}>
      <App {...config}/>
    </Core.AppContainer>)

  // Keep an eye on the lifecycle
  context.spy(Core.AppContainer.prototype, 'render')

  // Forget the render and actually call out the renderscene
  context.stub(App.prototype, "render", () => App.prototype.renderScene())

  // Inject a mock dom
  savor.addDom('<!doctype html><html><body></body></html>')

  context.expect(function() {
    // This should not mount because we're missing the route
    context.mount(main)
  }).to.throw(Errors.UNABLE_TO_LOAD_ROUTE().name)

  // Make sure the app is actually mounted and the lifecycle is initiated
  context.expect(Core.AppContainer.prototype.render.calledOnce).to.be.true

  // Let's clean up the observers
  Core.AppContainer.prototype.render.restore()
  App.prototype.render.restore()

  done()
}).

add("should render an app with a simple route", (context, done) => {
  const app = <SimpleApp {...config}/>
  const main = (<Core.AppContainer {...config}>
      { app }
    </Core.AppContainer>)

  // Inject a mock dom
  savor.addDom('<!doctype html><html><body></body></html>')

  // Let's wrap the actual app
  context.mount(main)

  done()
}).

add("should render an app with a more complex route", (context, done) => {
  const app = <SimpleApp {...config}/>
  const main = (<Core.AppContainer {...config}>
      { app }
    </Core.AppContainer>)

  // Inject a mock adapter
  global.localStorage = { getItem: (key, callback) => callback(null, JSON.stringify({ token: "token" })) }

  // Inject a mock dom
  savor.addDom('<!doctype html><html><body></body></html>')

  // Let's wrap the actual app
  context.mount(main)

  done()
}).

add("should not render an app with a screenless route", (context, done) => {
  const app = <ScreenLessApp {...config}/>
  const main = (<Core.AppContainer {...config}>
      { app }
    </Core.AppContainer>)

  // Inject a mock dom
  savor.addDom('<!doctype html><html><body></body></html>')

  context.expect(function() {
    // This should not mount because we're missing the route
    context.mount(main)
  }).to.throw(Errors.UNABLE_TO_LOAD_ROUTE().name)

  done()
}).

run("Mobile App Rendering")
