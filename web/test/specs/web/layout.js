/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { App, Screen } from '../../../src'
import Layout from '../../../src/core/Layout'

savor

.add('should create and load a layout without a cover', (context, done) => {
  global.localStorage.getItem = (key, callback) => callback(null, JSON.stringify({ test: 'test', username: 'test' }))
  const props = Object.assign({}, _props, {
    forceNavigation: true
  })
  const container = context.mount(<Layout {...props}/>)
  const layout = container.instance()

  layout.onMenuItem({})
  layout.onEvent('test', {})
  
  // And, we're looking good
  done()
})

.add('should render cover without navigation', (context, done) => {
  const props = Object.assign({}, _props, {
    cover: {
      navigation: false
    }
  })
  const container = context.mount(<Layout {...props}/>)
  const layout = container.instance()

  context.expect(layout.cover).to.exist
  context.expect(layout.coverOffset).to.equal(64)
  context.expect(layout.navigationUncover).to.be.false

  // And, we're looking good
  done()
})

.add('should render cover with navigation', (context, done) => {
  const props = Object.assign({}, _props, {
    cover: {
      navigation: true
    }
  })
  const container = context.mount(<Layout {...props}/>)
  const layout = container.instance()

  context.expect(layout.cover).to.exist
  context.expect(layout.coverOffset).to.equal(-64)
  context.expect(layout.navigationUncover).to.be.false

  // And, we're looking good
  done()
})

.add('should render cover with fluid navigation', (context, done) => {
  const props = Object.assign({}, _props, {
    cover: {
      navigation: true
    },
    layout: { fixed: false }
  })
  const container = context.mount(<Layout {...props}/>)
  const layout = container.instance()

  context.expect(layout.cover).to.exist
  context.expect(layout.coverOffset).to.equal(-64)
  context.expect(layout.navigationUncover).to.be.true

  // And, we're looking good
  done()
})

.add('should create and load a layout for a desktop', (context, done) => {
  const props = Object.assign({}, _props, {
    desktop: true
  })
  const container = context.mount(<Layout {...props}/>)
  const layout = container.instance()

  // And, we're looking good
  done()
})

.run('[Web] Layout Rendering')

const _props = { 
  id: "test", 
  menu: [{}, {}], 
  navigationUncover: true, 
  layout: { fixed: true },  
  theme: { 
    navigationColor: "red", 
    logoOnMobile: true,
    navigationWrapperStyle: "test" 
  }, 
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