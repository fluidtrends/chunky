/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Navigation } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", menu: [{}, {}], navigationUncover: true, layout: { fixed: true },  theme: { 
    navigationColor: "red", 
    logoOnMobile: true,
    navigationWrapperStyle: "test" 
  }}
  const container = context.shallow(<Navigation {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Navigation Component')
