import savor from 'savor'
import {
  retrieveCachedItem,
  cacheItem,
  clearCachedItem,
  retrieveAuthToken,
  cacheAuthToken,
  clearAuthToken,
  retrieveCloudToken,
  cacheCloudToken,
  clearCloudToken
} from '../..'

savor.add("should be able to detect if an item is not cached", (context, done) => {
  // Inject a mock adapter
  const Platform = { storage: { getItem: (key, callback) => callback(new Error('error')) }}
  global.Chunky = { Platform }

  // Look for an item but don't expect to find it
  savor.promiseShouldFail(retrieveCachedItem(), done, () => {})
}).

// add("should be able to detect if an item is cached", (context, done) => {
//   // Inject a mock adapter
//   const Platform = { storage: { getItem: (key, callback) => callback(null, JSON.stringify({ token: "token" })) }}
//   global.Chunky = { Platform }
//
//   // Look for the item
//   savor.promiseShouldSucceed(retrieveCachedItem(), done, (value) => {})
//   // savor.promiseShouldSucceed(retrieveCachedItem(), done, (value) => context.expect(value.token).is.equal("token"))
// }).
//
// add("should be able fail elegantly if an item cannot be cached", (context, done) => {
//   // Inject a mock adapter
//   const Platform = { storage: { setItem: (key, value, callback) => callback(new Error('error')) }}
//   global.Chunky = { Platform }
//
//   // Attempt to cache an item
//   savor.promiseShouldFail(cacheItem("token"), done, () => {})
// }).
//
// add("should be able to cache an auth token", (context, done) => {
//   // Inject a mock adapter
//   const Platform = { storage: { setItem: (key, value, callback) => callback() }}
//   global.Chunky = { Platform }
//
//   // Attempt to cache an auth token
//   savor.promiseShouldSucceed(cacheItem("token"), done, () => {})
// }).
//
// add("should be able fail elegantly if an item cannot be cleared", (context, done) => {
//   // Inject a mock adapter
//   const Platform = { storage: { removeItem: (key, callback) => callback(new Error('error')) }}
//   global.Chunky = { Platform }
//
//   // Let's see if we actually get the expected error back
//   savor.promiseShouldFail(clearCachedItem("token"), done, () => {})
// }).
//
// add("should be able clear a cached item", (context, done) => {
//   // Inject a mock adapter
//   const Platform = { storage: { removeItem: (key, callback) => callback() }}
//   global.Chunky = { Platform }
//
//   // Make sure the item can be cleared
//   savor.promiseShouldSucceed(clearCachedItem("token"), done, () => {})
// }).
//
// add("should be able handle auth token caching", (context, done) => {
//   // Inject a mock adapter
//   const Platform = { storage: {
//     setItem: (key, value, callback) => callback(),
//     getItem: (key, callback) => callback(null, JSON.stringify({ token: "token" })),
//     removeItem: (key, callback) => callback()
//   }}
//   global.Chunky = { Platform }
//
//   // Make sure the token can be set, retrieved and cached
//   savor.promiseShouldSucceed(cacheAuthToken({ token: "token" }), () => {
//     savor.promiseShouldSucceed(retrieveAuthToken(), () => {
//       savor.promiseShouldSucceed(clearAuthToken(), done, () => {})
//     }, () => {})
//   }, () => {})
// }).
//
// add("should be able handle cloud token caching", (context, done) => {
//   // Inject a mock adapter
//   const Platform = { storage: {
//     setItem: (key, value, callback) => callback(),
//     getItem: (key, callback) => callback(null, JSON.stringify({ token: "token" })),
//     removeItem: (key, callback) => callback()
//   }}
//   global.Chunky = { Platform }
//
//   // Make sure the token can be set, retrieved and cached
//   savor.promiseShouldSucceed(cacheCloudToken({ token: "token" }), () => {
//     savor.promiseShouldSucceed(retrieveCloudToken(), () => {
//       savor.promiseShouldSucceed(clearCloudToken(), done, () => {})
//     }, () => {})
//   }, () => {})
// }).

run("Data Cache")
