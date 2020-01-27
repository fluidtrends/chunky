/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import { Data, Core, Errors } from '../..'
import ReactGA from 'react-ga'

savor

.add('should setup view analytics', (context, done) => {
  const stub = context.stub(ReactGA, 'initialize', () => Promise.resolve())
    
  Data.Analytics.initialize({ type: 'google', key: 'key' })
  stub.restore()

  // And, we're looking good
  done()
})

.add('should trigger view analytics', (context, done) => {
  const stub = context.stub(ReactGA, 'initialize', () => Promise.resolve())
    
  Data.Analytics.initialize({ type: 'google', key: 'key' })
  Data.Analytics.view("/")
  stub.restore()

  // And, we're looking good
  done()
})

.add('should trigger event analytics', (context, done) => {
    const stub = context.stub(ReactGA, 'initialize', () => Promise.resolve())
      
    Data.Analytics.initialize({ type: 'google', key: 'key' })
    Data.Analytics.event("/")
    stub.restore()
  
    // And, we're looking good
    done()
})

.add('should trigger error analytics', (context, done) => {
    const stub = context.stub(ReactGA, 'initialize', () => Promise.resolve())
      
    Data.Analytics.initialize({ type: 'google', key: 'key' })
    Data.Analytics.error("/")
    stub.restore()
  
    // And, we're looking good
    done()
})
  
.run('App Analytics')
