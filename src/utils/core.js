import * as Errors from '../errors'
import base64 from 'base-64'

export function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      reject(Errors.OPERATION_TIMEOUT())
    }, ms)
    promise.then(resolve, reject)
  })
}

export function encodeBase64(value) {
  return base64.encode(value)
}

export function decodeBase64(value) {
  return base64.decode(value)
}
