/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Buy } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", components: { getAccess: "" }, theme: {
    secondaryColor: "red",
    primaryColor: "red"
  }}
  const container = context.shallow(<Buy {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Buy Component')
