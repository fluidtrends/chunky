/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Team } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", theme: { translatedStrings: "test" }}
  const container = context.shallow(<Team {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Team Component')
