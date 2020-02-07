/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { App, Screen } from '../../../src'
import Layout from '../../../src/core/Layout'

savor

.add('should create and load a layout', (context, done) => {
  const props = { id: "test", menu: [{}, {}], navigationUncover: true, layout: { fixed: true },  theme: { 
    navigationColor: "red", 
    logoOnMobile: true,
    navigationWrapperStyle: "test" 
  }, info: {
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
  }}

  const container = context.mount(<Layout {...props}/>)
  const layout = container.instance()

  context.expect(layout.coverOffset).to.exist

  // And, we're looking good
  done()
})

.run('[Web] Layout Rendering')
