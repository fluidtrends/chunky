/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Component } from '../../../src'

savor

.add('should create and load a component', (context, done) => {
  context.spy(Component.prototype, 'render')

  const props = {
    width: 800,
    height: 600
  }

  const container = context.mount(<Component {...props}/>)
  const component = container.instance()

  context.expect(component.width).to.equal(800)
  context.expect(component.height).to.equal(600)
  component.onEvent("test", {})
  
  // And, we're looking good
  Component.prototype.render.restore()
  done()
})

.run('[Web] Component Rendering')
