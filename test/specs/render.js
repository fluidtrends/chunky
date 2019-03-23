/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Core, Errors } from '../..'
import App from '../assets/App'
import appConfig from '../assets/chunky'

savor

// .add('should not render an empty app container', (context, done) => {
//   context.expect(() => {
//     context.shallow(<Core.AppContainer />)
//   }).to.throw(Errors.UNABLE_TO_LOAD_APP().message)
//
//   done()
// })

// .add('should render a simple app without any properties', (context, done) => {
//   context.expect(() => {
//     context.shallow(<Core.AppContainer>
//       <App />
//     </Core.AppContainer>)
//   }).to.throw(Errors.UNABLE_TO_LOAD_CHUNKS().message)
//   done()
// })

// .add('should create an app and have a valid lifecyle', (context, done) => {
//   // Start off with an empty dom
//   savor.addDom('<!doctype html><html><body></body></html>')
//
//   // Let's mount the app
//   context.spy(App.prototype, 'componentDidMount')
//   context.spy(App.prototype, 'render')
//
//   const container = context.mount(<Core.AppContainer {...appConfig}>
//     <App {...appConfig} />
//   </Core.AppContainer>)
//
//   // Let's make sure the component hierarchy is as expected
//   context.expect(container.length).to.equal(1)
//   context.expect(container.childAt(0).name()).to.equal('Provider')
//
//   // Make sure the app is actually mounted and the lifecycle is initiated
//   context.expect(App.prototype.componentDidMount.calledOnce).to.be.true
//   context.expect(App.prototype.render.calledOnce).to.be.true
//
//   // Let's clean up the observers
//   App.prototype.componentDidMount.restore()
//   App.prototype.render.restore()
//
//   // And, we're looking good
//   done()
// })

// .add('should create an app and mount the appropriate screen', (context, done) => {
//   // Start off with an empty dom
//   savor.addDom('<!doctype html><html><body></body></html>')
//
//   // Let's mount the app
//   const container = context.mount(<Core.AppContainer {...appConfig}>
//     <App {...appConfig} />
//   </Core.AppContainer>)
//
//   const provider = container.childAt(0)
//   context.expect(provider.exists()).to.be.true
//
//   const app = provider.childAt(0)
//   context.expect(app.exists()).to.be.true
//
//   const screenContainer = app.childAt(0)
//   context.expect(screenContainer.exists()).to.be.true
//
//   const screenConnector = screenContainer.childAt(1)
//   context.expect(screenConnector.exists()).to.be.true
//
//   const screen = screenConnector.childAt(0)
//   context.expect(screen.exists()).to.be.true
//   context.expect(screen.name()).to.equal('LoadingScreen')
//
//   // And, we're looking good
//   done()
// })

// .add('should create a valid screen instance', (context, done) => {
//   // Start off with an empty dom
//   savor.addDom('<!doctype html><html><body></body></html>')
//
//   // Let's mount the app
//   const container = context.mount(<Core.AppContainer {...appConfig}>
//     <App {...appConfig} />
//   </Core.AppContainer>)
//
//   const wrapper = container.childAt(0).childAt(0).childAt(0).childAt(1).childAt(0)
//   const screen = wrapper.instance()
//
//   context.expect(screen.entities).to.exist
//   context.expect(screen.containerId).to.exist
//   context.expect(screen.isContainer).to.be.true
//   context.expect(wrapper.props().startOperation).to.exist
//   screen.reloadMe()
//   // screen.updateProgress('test')
//   // container.update()
//
//   // And, we're looking good
//   done()
// })

.run('App Rendering')
