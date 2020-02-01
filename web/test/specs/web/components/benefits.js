/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Benefits } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", benefits: [{ image: "test", text: "test" }] }

  const container = context.shallow(<Benefits {...props} />)

  // And, we're looking good
  done()
})

.run('[Web] Benefits Component')
