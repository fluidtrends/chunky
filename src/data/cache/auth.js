import * as Config from '../../config'
import { retrieveCachedItem, cacheItem, clearCachedItem } from './generic'

export function retrieveAuth() {
  return retrieveCachedItem(Config.AUTH_CACHE_KEY)
}

export function cacheAuth(data) {
  return cacheItem(Config.AUTH_CACHE_KEY, data)
}

export function clearAuth() {
  return clearCachedItem(Config.AUTH_CACHE_KEY)
}

