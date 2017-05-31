import * as Errors from '../errors'
import ChunkyError from '../core/Error'

export default class Operation {
  start() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())
  }
}
