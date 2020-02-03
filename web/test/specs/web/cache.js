/* eslint-disable no-unused-expressions */

import React from 'react'
import savor from 'react-savor'
import Cache from '../../../src/core/Cache'

savor

.add('should handle cache initialization', (context, done) => { 
  const props = { test: "test", desktop: false }
  const cache = new Cache(props)

  context.expect(cache.context).to.exist
  context.expect(cache.props.test).to.equal('test')
  context.expect(cache.isRuntime).to.exist
  context.expect(cache.isDesktop).to.be.false
  context.expect(cache.images).to.exist

  cache.cacheImage()

  // And, we're looking good
   done()
})

.add('should handle image caching', (context, done) => { 
    const props = { test: "test", desktop: true }
    const cache = new Cache(props)
  
    cache.cacheImage("test")
    context.expect(cache.image('test')).to.exist
    context.expect(cache.image('test-oops')).to.exist

  
    // And, we're looking good
     done()
  })
  

.run('[Web] Cache')
