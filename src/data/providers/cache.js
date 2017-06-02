import * as Errors from '../../errors'
import * as Config from '../../config'
import * as Utils from '../../utils'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'

import {
  retrieveCachedItem,
  cacheItem,
  clearCachedItem
} from '../cache'

export default class CacheDataProvider extends DataProvider {

  retrieveOperation(args, options, props) {
    // Look up the token to fetch
    const itemKey = args[0]

    // Send back the value
    return retrieveCachedItem(`chunky/${itemKey}`)
  }

  deleteOperation(args, options, props) {
    // Look up the token to remove
    const itemKey = args[0]
    
    // Send back the value
    return clearCachedItem(`chunky/${itemKey}`)  
  }

}

