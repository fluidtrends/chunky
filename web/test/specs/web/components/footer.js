/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Footer } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", info: {
    watermark: "test"
  }, theme: {
    footerColor: "red",
    logoLightImage: "test",
    footerHeaderColor: "red",
    footerTintColor: "red"
  }, footer: { 
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
  const container = context.shallow(<Footer {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Footer Component')
