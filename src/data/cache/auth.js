import * as Config from '../../config'
import * as Errors from '../../errors'

import { retrieveCachedItem, cacheItem, clearCachedItem } from './generic'

export function retrieveAuthToken() {
  return retrieveCachedItem(Config.AUTH_TOKEN_CACHE_KEY)
}

export function cacheAuthToken(token) {
  return cacheItem(Config.AUTH_TOKEN_CACHE_KEY, token)
}

export function clearAuthToken() {
  return clearCachedItem(Config.AUTH_TOKEN_CACHE_KEY)
}

export function retrieveCloudToken() {
  return retrieveCachedItem(Config.CLOUD_TOKEN_CACHE_KEY)
}

export function cacheCloudToken(token) {
  return cacheItem(Config.CLOUD_TOKEN_CACHE_KEY, token)
}

export function clearCloudToken() {
  return clearCachedItem(Config.CLOUD_TOKEN_CACHE_KEY)
}
