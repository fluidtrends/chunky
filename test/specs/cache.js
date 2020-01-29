/* eslint-disable no-unused-expressions */

import savor from 'savor'
import { Data, Errors } from '../..'

savor.add('should be able to detect if an item is not cached', (context, done) => {
  // Inject a mock adapter
  global.storage = { getItem: (key, callback) => callback(new Error('error')) }

  // Look for an item but don't expect to find it
  savor.promiseShouldFail(Data.Cache.retrieveCachedItem(), done, (error) => {
    context.expect(error.message).to.equal(Errors.COULD_NOT_RETRIEVE_CACHED_ITEM().message)
  })
})

.add('should be able to detect if an item is cached', (context, done) => {
  // Inject a mock adapter
  global.storage = { getItem: (key, callback) => callback(null, JSON.stringify({ token: 'token' })) }

  // Look for the item
  savor.promiseShouldSucceed(Data.Cache.retrieveCachedItem(), done, (value) => context.expect(value.token).is.equal('token'))
})

.add('should be able fail elegantly if an item cannot be cached', (context, done) => {
  // Inject a mock adapter
  global.storage = { setItem: (key, value, callback) => callback(new Error('error')) }

  // Attempt to cache an item
  savor.promiseShouldFail(Data.Cache.cacheItem('token'), done, (error) => context.expect(error.message).to.equal(Errors.COULD_NOT_CACHE_ITEM().message))
})

.add('should be able to cache an auth token', (context, done) => {
  // Inject a mock adapter
  global.storage = { setItem: (key, value, callback) => callback() }

  // Attempt to cache an auth token
  savor.promiseShouldSucceed(Data.Cache.cacheItem('token'), done, () => {})
})

.add('should be able fail elegantly if an item cannot be cleared', (context, done) => {
  // Inject a mock adapter
  global.storage = { removeItem: (key, callback) => callback(new Error('error')) }

  // Let's see if we actually get the expected error back
  savor.promiseShouldFail(Data.Cache.clearCachedItem('token'), done, (error) => context.expect(error.message).to.equal(Errors.COULD_NOT_CLEAR_CACHED_ITEM().message))
})

.add('should be able clear a cached item', (context, done) => {
  // Inject a mock adapter
  global.storage = { removeItem: (key, callback) => callback() }

  // Make sure the item can be cleared
  savor.promiseShouldSucceed(Data.Cache.clearCachedItem('token'), done, () => {})
})

.add('should be able handle auth token caching', (context, done) => {
  // Inject a mock adapter
  global.storage = {
    setItem: (key, value, callback) => callback(),
    getItem: (key, callback) => callback(null, JSON.stringify({ token: 'token' })),
    removeItem: (key, callback) => callback()
  }

  // Make sure the token can be set, retrieved and cached
  savor.promiseShouldSucceed(Data.Cache.cacheAuth({ token: 'token' }), () => {
    savor.promiseShouldSucceed(Data.Cache.retrieveAuth(), () => {
      savor.promiseShouldSucceed(Data.Cache.clearAuth(), done, () => {})
    }, () => {})
  }, () => {})
})

.add('should be able handle context caching', (context, done) => {
  // Inject a mock adapter
  global.storage = {
    setItem: (key, value, callback) => callback(),
    getItem: (key, callback) => callback(null, JSON.stringify({ context: 'context' })),
    removeItem: (key, callback) => callback()
  }

  // Make sure the token can be set, retrieved and cached
  savor.promiseShouldSucceed(Data.Cache.cacheContext({ context: 'context' }), () => {
    savor.promiseShouldSucceed(Data.Cache.retrieveContext(), () => {
      savor.promiseShouldSucceed(Data.Cache.clearContext(), done, () => {})
    }, () => {})
  }, () => {})
})

.run('Data Cache')
