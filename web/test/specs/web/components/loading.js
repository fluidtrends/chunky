/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Loading } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", option: { file: "test" }}
  const container = context.shallow(<Loading {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Loading Component')
