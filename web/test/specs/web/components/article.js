/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Article } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", src: "test" }

  const container = context.shallow(<Article {...props} />)

  // And, we're looking good
  done()
})

.run('[Web] Article Component')
