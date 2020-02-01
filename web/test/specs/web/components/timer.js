/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Timer } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", periods: [{}] }
  const container = context.shallow(<Timer {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Timer Component')
