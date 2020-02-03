/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Columns } from '../../../../src/components'

savor

.add('should be able to render rows', (context, done) => {
  global.fetch = () => Promise.resolve({ json: () => ({ rows: [] }) })

  const props = { id: "test", option: { file: "test" }}
  const container = context.shallow(<Columns {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Columns Component')
