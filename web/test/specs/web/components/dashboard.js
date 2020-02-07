/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Dashboard } from '../../../../src/components'

savor

.add('should handle sectionless dashboard', (context, done) => {
  const props = { id: "test", option: { file: "test" }}
  const container = context.shallow(<Dashboard {...props}/>)

  // And, we're looking good
  done()
})

.add('should render with is a custom renderer', (context, done) => {
  const props = { id: "test", 
    section: "test", 
    sections: [{}], 
    renderContent: () => ({}) }
  const container = context.shallow(<Dashboard {...props}/>)

  // And, we're looking good
  done()
})

.add('should render withour a custom renderer', (context, done) => {
  const props = { id: "test", 
    section: "test", 
    nav: true,
    sections: [{}]
  }
  const container = context.shallow(<Dashboard {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Dashboard Component')
