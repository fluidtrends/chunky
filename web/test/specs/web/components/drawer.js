/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Drawer } from '../../../../src/components'
import { Data, Core, Errors } from 'react-chunky'

savor

.add('should handle component lifecycle', (context, done) => {
  const props = { id: "test", 
      theme: { translatedStrings: ["test"] },
      menu: [{ one: "one" }]
  }
  
  global.fetch = () => Promise.resolve(({ json: () => ({}) }))
  global.localStorage.getItem = (key, callback) => callback(null, JSON.stringify({ test: 'test', username: 'test' }))
  const container = context.mount(<Drawer {...props}/>)

  // And, we're looking good
  done()
})

.add('should handle cache errors', (context, done) => {
  const props = { id: "test", 
      theme: { translatedStrings: ["test"] }
    }

  const stub = context.stub(Data.Cache, "retrieveCachedItem").callsFake(() => Promise.reject(new Error("oops")))
  global.fetch = () => Promise.reject(new Error("oops"))
  global.localStorage.getItem = (key, callback) => callback(new Error("oops"))
  const container = context.mount(<Drawer {...props}/>)

  // And, we're looking good
  stub.restore()
  done()
})

.run('[Web] Drawer Component')
