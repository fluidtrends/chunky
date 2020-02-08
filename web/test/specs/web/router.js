/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import Router from '../../../src/core/Router'

savor

.add('should not create a router without sections', (context, done) => {
  const routes = Router.createSectionRoutes()
  context.expect(routes).to.not.exist
  
  // And, we're looking good
  done()
})

.add('should create a route with a simple element', (context, done) => {
  const routes = Router.createSectionRoutes({
    stack: ["test"]
  }, () => ({}))
  context.expect(routes).to.exist
  
  // And, we're looking good
  done()
})

.add('should create a route with a complex element', (context, done) => {
  const routes = Router.createSectionRoutes({
    stack: [["test"]]
  }, () => ({}))
  context.expect(routes).to.exist
  
  // And, we're looking good
  done()
})

.run('[Web] Router Rendering')