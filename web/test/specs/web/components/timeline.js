/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Timeline } from '../../../../src/components'

savor

.add('should handle rendering without milestones', (context, done) => {
  const props = { id: "test", option: { file: "test" }}
  const container = context.shallow(<Timeline {...props}/>)
  const timeline = container.instance()
  
  timeline.setState({ loading: true })

  // And, we're looking good
  done()
})

.add('should handle rendering with milestones', (context, done) => {
  const props = { id: "test", milestones: [{
    status: "done"
  }, {
    status: "progress"
  }, {
    status: "todo"
  }, {
    status: "test"
  }], option: { file: "test" }}
  const container = context.shallow(<Timeline {...props}/>)
  const timeline = container.instance()
  
  timeline.setState({ loading: true })

  // And, we're looking good
  done()
})
.run('[Web] Timeline Component')
