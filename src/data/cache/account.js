import * as Config from '../../config'
import * as Errors from '../../errors'

import { retrieveCachedItem, cacheItem, clearCachedItem } from './generic'

export function retrieveAccount() {
  return retrieveCachedItem(Config.ACCOUNT_CACHE_KEY)
}

export function cacheAccount(account) {
  return cacheItem(Config.ACCOUNT_CACHE_KEY, account)
}

export function clearAccount() {
  return clearCachedItem(Config.ACCOUNT_CACHE_KEY)
}
