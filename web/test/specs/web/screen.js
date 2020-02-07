/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { App, Screen } from '../../../src'
import { Data, Core, Errors } from 'react-chunky'
import appConfig from '../../assets/chunky'
import LoadingScreen from '../../assets/chunks/auth/src/screens/loading'

savor

.add('should create and load a screen', (context, done) => {
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
  
  // And, we're looking good
  Screen.prototype.render.restore()
  done()
})

.add('should initialize and load properties', (context, done) => {
  const props = {
    location: "/",
    env: "production",
    provisioning: {
      rest: {
        url: "test"
      }
    },
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
  context.expect(screen.platformType).to.exist
  context.expect(screen.restUrl).to.exist
  context.expect(screen.sideMenu).to.exist
  context.expect(screen.layout).to.exist
  context.expect(screen.isSmallScreen).to.be.true

  // Simulate a scroll
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 30 }));
  
  // And, we're looking good
  done()
})

.add('should handle screen events', (context, done) => {
  const props = {
    location: "/",
    env: "production",
    provisioning: {
      rest: {
        url: "test"
      }
    },
    theme: {
      keepNavigatorSticky: false
    },
    history: {
      listen: () => ({})
    }
  }

  const container = context.mount(<LoadingScreen {...props}/>)
  const screen = container.instance()

  // Redirects
  screen.handleLocalEvent("/")
  screen.handleExternalEvent("/")

  // Simulate a scroll
  window.dispatchEvent(new window.UIEvent('scroll', { detail: 30 }));

  // Simulate menu item selections
  screen.onMenuItem ()
  screen.onMenuItem ({
    action: "test",
    path: "/"
  })
  screen.onMenuItem ({
    action: "test",
    link: "test"
  })
  
  // And, we're looking good
  done()
})

.add('should handle basic variants', (context, done) => {
  const props = {
    location: { pathname: "/" },
    path: "/auth",
    variants: true,
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

.add('should handle complex variants', (context, done) => {
  const props = {
    location: { pathname: "/" },
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
