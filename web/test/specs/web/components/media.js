/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Media } from '../../../../src/components'

savor

.add('should render a local cached image', (context, done) => {
  const props = { id: "test", 
    cache: { image: () => ({ id: "test", data: { images: [{ path: "test" }, { path: "test"}] } }) }, 
    image: "test",
    imageSmall: true
  }
  const container = context.shallow(<Media {...props}/>)

  // And, we're looking good
  done()
})

.add('should render a local uncached image', (context, done) => {
  const props = { id: "test", 
    image: "test",
    cache: {},
    imageSmall: true
  }
  const container = context.shallow(<Media {...props}/>)

  // And, we're looking good
  done()
})

.add('should render a remote image', (context, done) => {
  const props = { id: "test", 
    cache: { image: () => ({ id: "test", data: { images: [{ path: "test" }, { path: "test"}] } }) }, 
    image: "http://test",
    imageSmall: true
  }
  const container = context.shallow(<Media {...props}/>)

  // And, we're looking good
  done()
})

.add('should render a video', (context, done) => {
  const props = { id: "test", 
    video: "test"
  }
  const container = context.shallow(<Media {...props}/>)

  // And, we're looking good
  done()
})

.run('[Web] Media Component')
