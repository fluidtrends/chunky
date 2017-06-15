import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'

import {
  retrieveCachedItem,
  cacheItem,
  clearCachedItem
} from '../cache'

export default class CacheDataProvider extends DataProvider {

  retrieveOperation(nodes, options, props) {
    // Look up the token to fetch
    const itemKey = nodes[0]

    // Send back the value
    return retrieveCachedItem(`chunky/${itemKey}`)
  }

  deleteOperation(nodes, options, props) {
    // Look up the token to remove
    const itemKey = nodes[0]
    
    // Send back the value
    return clearCachedItem(`chunky/${itemKey}`)  
  }

}

