/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Cover } from '../../../../src/components'
import { Data, Core, Errors } from 'react-chunky'

savor

.add('should handle cache errors', (context, done) => {
  const props = { id: "test", type: "presentation" }
  const stub = context.stub(Data.Cache, "retrieveCachedItem").callsFake(() => Promise.reject(new Error("oops")))

  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  stub.restore()
  done()
})

.add('should handle translations', (context, done) => {
  const props = { id: "test", 
        theme: { translatedStrings: ["test"] }, 
        type: "presentation" 
    }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should handle translations cache error', (context, done) => {
  const props = { id: "test", 
        theme: { translatedStrings: ["test"] }, 
        type: "presentation" 
    }
    const stub = context.stub(Data.Cache, "retrieveCachedItem").callsFake(() => Promise.reject(new Error("oops")))
    global.fetch = () => Promise.reject(new Error("oops"))
    global.localStorage.getItem = (key, callback) => callback(new Error("oops"))
    const container = context.shallow(<Cover {...props}/>)

  // And, we're looking good
  stub.restore()
  done()
})

.add('should render a presentation cover without media', (context, done) => {
  const props = { id: "test", type: "presentation" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render a presentation cover with an image', (context, done) => {
  const props = { id: "test", type: "presentation", image: "test" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render a presentation cover with a video', (context, done) => {
  const props = { id: "test", type: "presentation", video: "test" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render a simple cover', (context, done) => {
  const props = { id: "test", type: "simple" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render a menu cover', (context, done) => {
  const props = { id: "test", type: "menu" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render an ico cover', (context, done) => {
  const props = { id: "test", type: "ico" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render an section cover', (context, done) => {
  const props = { id: "test", type: "section" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render an section cover with video', (context, done) => {
  const props = { id: "test", type: "section",  video: "test" }
  const container = context.shallow(<Cover {...props}/>)
  
  // And, we're looking good
  done()
})

.add('should render an unknown cover with video', (context, done) => {
  const props = { id: "test", type: "test", video: "test", titleStyle: "test" }
  const container = context.shallow(<Cover {...props}/>)

  // And, we're looking good
  done()
})

.add('should handle actions', (context, done) => {
  const props = { id: "test", type: "simple", video: "test", titleStyle: "test",
                  cover: { link:"test" } }
  const container = context.shallow(<Cover {...props}/>)
  const cover = container.instance()
  cover.triggerAction()
  
  // And, we're looking good
  done()
})
.run('[Web] Cover Component')
