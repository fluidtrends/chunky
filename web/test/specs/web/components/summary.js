/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Summary } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", animation: "test" }
  const container = context.shallow(<Summary {...props}/>)
  const screen = container.instance()
  
  // And, we're looking good
  done()
})

.run('[Web] Summary Component')
