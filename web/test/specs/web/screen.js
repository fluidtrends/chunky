/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { App, Screen } from '../../../src'
import { Data, Core, Errors } from 'react-chunky'
import appConfig from '../../assets/chunky'
import LoadingScreen from '../../assets/chunks/auth/src/screens/loading'

savor

.add('savoring should create and load a screen', (context, done) => {
  context.spy(Screen.prototype, 'render')

  const props = {
    location: "/",
    theme: {
      keepNavigatorSticky: false
    },
    history: {
      listen: () => ({})
    }
  }

  const container = context.mount(<LoadingScreen {...props}/>)
  const screen = container.instance()

  context.expect(screen.isMobile).to.be.false
  context.expect(screen.platformOS).to.exist
  context.expect(screen.isWindows !== screen.isMac).to.be.true

  // Simulate a scroll
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 30 }));
  
  // And, we're looking good
  Screen.prototype.render.restore()
  done()
})

.add('savoring should handle events', (context, done) => {
  const props = {
    location: "/",
    variants: [{}, {}],
    skipRootVariant: true,
    theme: {
      keepNavigatorSticky: false
    },
    history: {
      listen: () => ({})
    }
  }

  const container = context.mount(<LoadingScreen {...props}/>)
  const screen = container.instance()

  screen.handleLocalEvent("/")
  screen.handleExternalEvent("/")

  // And, we're looking good
  done()
})

.add('savoring should handle variants', (context, done) => {
  const props = {
    location: "/auth",
    path: "/auth",
    variants: "vars",
    sections: [{}, {}], 
    skipRootVariant: true,
    theme: {
      keepNavigatorSticky: true
    },
    history: {
      listen: () => ({})
    }
  }

  const container = context.mount(<LoadingScreen {...props}/>)
  const screen = container.instance()

  // And, we're looking good
  done()
})

.run('[Web] Screen Rendering')
