/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Media } from '../../../../src/components'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", cache: { image: () => ({ id: "test", data: { images: [{ path: "test" }, { path: "test"}] } }) }, image: "test" }
  const container = context.shallow(<Media {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Media Component')
