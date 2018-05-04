import * as Config from '../../config'
import { retrieveCachedItem, cacheItem, clearCachedItem } from './generic'

export function retrieveAuth () {
  return retrieveCachedItem(Config.AUTH_CACHE_KEY)
}

export function cacheAuth (data) {
  const newData = Object.assign({}, data, data.user && data.user.stsTokenManager && { access: data.user.stsTokenManager })
  return cacheItem(Config.AUTH_CACHE_KEY, newData)
}

export function clearAuth () {
  return clearCachedItem(Config.AUTH_CACHE_KEY)
}

export function retrieveContext () {
  return retrieveCachedItem(Config.AUTH_CONTEXT_KEY)
}

export function cacheContext (data) {
  return cacheItem(Config.AUTH_CONTEXT_KEY, data)
}

export function clearContext () {
  return clearCachedItem(Config.AUTH_CONTEXT_KEY)
}
