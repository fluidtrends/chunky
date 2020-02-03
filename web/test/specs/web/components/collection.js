/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Collection } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", categories: []}
  const container = context.mount(<Collection {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Collection Component')
