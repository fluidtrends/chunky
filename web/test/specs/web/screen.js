/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { App, Screen } from '../../../src'
import { Data, Core, Errors } from 'react-chunky'
import appConfig from '../../assets/chunky'
import LoadingScreen from '../../assets/chunks/auth/src/screens/loading'
import Layout from '../../../src/core/Layout'

savor

.add('should create and load a screen', (context, done) => {
  context.spy(LoadingScreen.prototype, 'render')

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
  LoadingScreen.prototype.render.restore()
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
  screen.sidebarMenuSelected()
  screen.sidebarMenuSelected({ action: 'renderScreenLayout' })
  screen.sidebarMenuSelected({ path: "/" })
  
  screen.pushTransition({ data: { path: "/" }}, { path: "/" })

  // And, we're looking good
  done()
})

.add('should handle basic variants', (context, done) => {
  const props = Object.assign({}, _props, {
    variants: true
  })
  const container = context.mount(<LoadingScreen {...props}/>)
  const screen = container.instance()

  // And, we're looking good
  done()
})

.add('should handle complex missing variants', (context, done) => {
  const props = Object.assign({}, _props, {
    variants: []
  })
  
  context.mount(<LoadingScreen {...props}/>)

  // And, we're looking good
  done()
})

.add('should handle complex variants', (context, done) => {
  global.fetch = () => Promise.resolve({ json: () => ({})})
  const props = Object.assign({}, _props, {
    variants: "http://test"
  })
  context.mount(<LoadingScreen {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should handle local complex variants', (context, done) => {
  global.fetch = () => Promise.resolve({ json: () => ({})})
  const props = Object.assign({}, _props, {
    variants: "test"
  })
  context.mount(<LoadingScreen {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should handle private rendering', (context, done) => {
  const props = Object.assign({}, _props, {
    private: true,
    account: false,
    permissions: {
      publicRedirect: "test"
    }
  })

  const container = context.mount(<LoadingScreen {...props}/>)
  const screen = container.instance()

  // And, we're looking good
  done()
})

.add('should handle guest rendering', (context, done) => {
  const props = Object.assign({}, _props, {
    private: false,
    account: true,
    guestOnly: true,
    permissions: {
      publicRedirect: "test"
    }
  })

  const container = context.mount(<LoadingScreen {...props}/>)
  const screen = container.instance()

  // And, we're looking good
  done()
})

.add('should handle skip state', (context, done) => {
  const stub = context.stub(Layout.prototype, "render").callsFake(() => <div/>)

  const props = Object.assign({}, _props, {})
  const container = context.mount(<Screen {...props}/>)
  container.setState({ skip: true })

  // And, we're looking good
  stub.restore()
  done()
})

.add('should stop on errors', (context, done) => {
  const stub = context.stub(Layout.prototype, "render").callsFake(() => <div/>)

  const props = Object.assign({}, _props, {})
  const container = context.mount(<Screen {...props}/>)
  container.setState({ stopError: true })

  // And, we're looking good
  stub.restore()
  done()
})

.add('should not render without a height', (context, done) => {
  const stub = context.stub(Layout.prototype, "render").callsFake(() => <div/>)

  const props = Object.assign({}, _props, {})
  const container = context.mount(<Screen {...props}/>)
  container.setState({ height: 0 })

  // And, we're looking good
  stub.restore()
  done()
})

.add('should render with a different redirect', (context, done) => {
  const stub = context.stub(Layout.prototype, "render").callsFake(() => <div/>)

  const props = Object.assign({}, _props, {})
  const container = context.mount(<Screen {...props}/>)
  container.setState({ redirect: { pathname: "/", push: true } })

  // And, we're looking good
  stub.restore()
  done()
})

.add('should not render with a self redirect', (context, done) => {
  const stub = context.stub(Layout.prototype, "render").callsFake(() => <div/>)
  const stub2 = context.stub(Screen.prototype, "redirect").callsFake(() => <div/>)
  const props = Object.assign({}, _props, {})
  const container = context.mount(<Screen {...props}/>)
  container.setState({ redirect: { pathname: "/auth", push: true } })

  // And, we're looking good
  stub.restore()
  stub2.restore()

  done()
})

.run('[Web] Screen Rendering')

const _props = {
  location: { pathname: "/" },
  path: "/auth",
  sections: [{
    path: "/"
  }, {
    path: "/auth"
  }], 
  skipRootVariant: true,
  history: {
    listen: () => ({})
  },
  menu: [{}, {}], 
  navigationUncover: true, 
  layout: { fixed: true },  
  theme: { 
    navigationColor: "red", 
    logoOnMobile: true,
    navigationWrapperStyle: "test" 
  }, 
  keepNavigatorSticky: true,
  info: {
    watermark: "test"
  },
  footer: { 
    socialMediaLinks: {
      facebook: ""
    },
    sections: [
      {
        title: "Get Involved",
        id: "social",
        elements: [
          {
            "id": "home",
            "title": "GitHub Home",
            "link": "https://github.com/fluidtrends/chunky"
          }
        ]
      }
    ]
  }
}
