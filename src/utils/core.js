import * as Errors from '../errors'
export function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(Errors.OPERATION_TIMEOUT())
    }, ms)
    promise.then(resolve, reject)
  })
}
