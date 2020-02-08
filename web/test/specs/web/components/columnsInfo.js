/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Columns } from '../../../../src/components'

savor

.add('should be able to handle remote errors', (context, done) => {
  const props = { id: "test", option: { file: "test" }}
  global.fetch = () => Promise.reject(new Error("oops"))

  context.expect(() => {
    const container = context.shallow(<Columns {...props}/>)
  }).to.throw

  // And, we're looking good
  done()
})

.add('should be able to render without any rows', (context, done) => {
  global.fetch = () => Promise.resolve({ json: () => ({ rows: [] }) })

  const props = { id: "test", option: { file: "test" }}
  const container = context.shallow(<Columns {...props}/>)

  // And, we're looking good
  done()
})

.add('should be able to render rows', (context, done) => {
  global.fetch = () => Promise.resolve({ json: () => ({ rows: [{
    columns: [{
      icon: "test",
      title: "test",
      subtitle: "test"
    }]
  }] }) })

  const props = { id: "test", iconColor: "test" }
  const container = context.shallow(<Columns {...props}/>)

  // And, we're looking good
  done()
})


.run('[Web] Columns Component')
