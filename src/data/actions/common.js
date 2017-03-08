import * as cache from '../cache'
import * as errors from '../../errors'

export const type = (name, kind) => `chunky/${name.toLowerCase()}/${kind.toLowerCase()}`
export const timestamp = () => Date.now()

export const start = (name) => ({ type:  type(name, "start"), timestamp: timestamp() })
export const error = (name, error, source) => ({ type:  type(name, "error"), source, error, timestamp: timestamp() })
export const ok = (name, data, source) => ({ type:  type(name, "ok"), data, source, timestamp: timestamp() })

export function asyncAction (name, operation, source) {
  return (dispatch) => {
    dispatch(start(name))
    operation().
          then(data => dispatch(ok(name, data, source))).
          catch(err => dispatch(error(name, err, source)))
  }
}

export function getFromCache (name, id) {
  return asyncAction(name, () => cache.retrieveCachedItem(id), "cache")
}

export function deleteFromCache (name, id) {
  return asyncAction(name, () => cache.clearAuthToken(id), "cache")
}

export function operation (name, operation) {
  return asyncAction(name, () => operation.start(), "remote")
}
