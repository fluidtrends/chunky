import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'

export default class LocalDataProvider extends DataProvider  {

  deleteOperation(nodes, options, props) {
    return Promise.resolve()
  } 

}

