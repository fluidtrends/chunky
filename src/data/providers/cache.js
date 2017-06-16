import DataProvider from '../../core/DataProvider'
import merge from 'deepmerge'

import {
  retrieveCachedItem,
  cacheItem,
  clearCachedItem
} from '../cache'

export default class CacheDataProvider extends DataProvider {

  create({ nodes, options, props }) {
    // Look up the token to fetch
    const itemKey = nodes[0]

    // Send back the value
    return cacheItem(`chunky/${itemKey}`)
  }

  retrieve({ nodes, options, props }) {
    // Look up the token to fetch
    const itemKey = nodes[0]

    // Send back the value
    return retrieveCachedItem(`chunky/${itemKey}`, props)
  }

  update({ nodes, options, props }) {
    // Look up the token to fetch
    const itemKey = nodes[0]

    // First retrieve the old value
    return retrieveCachedItem(`chunky/${itemKey}`).

           // And then deep merge the new data
           then(oldValue => cacheItem(`chunky/${itemKey}`, merge.all[oldValue, props]))
  }

  delete({ nodes, options, props }) {
    // Look up the token to remove
    const itemKey = nodes[0]
    
    // Send back the value
    return clearCachedItem(`chunky/${itemKey}`)  
  }

}

