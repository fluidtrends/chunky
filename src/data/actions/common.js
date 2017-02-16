import * as cache from '../cache'
import * as errors from '../../errors'

export const type = (name, kind) => `Chunky/${kind.toUpperCase()}/${name.toUpperCase()}`
export const timestamp = () => Date.now()

export const start = (name) => ({ type:  type(name, "start"), timestamp: timestamp() })
export const error = (name, error, filter) => ({ type:  type(name, "error"), filter, error, timestamp: timestamp() })
export const ok = (name, data, filter) => ({ type:  type(name, "ok"), data, filter, timestamp: timestamp() })

export function asyncAction (name, operation, filter) {
  return (dispatch) => {
    dispatch(start(name))
    operation().
          then(data => dispatch(ok(name, data, filter))).
          catch(err => dispatch(error(name, err, filter)))
  }
}

export function getFromCache (name, id) {
  return asyncAction(name, () => cache.retrieveCachedItem(id), "cache")
}

export function deleteFromCache (name, id) {
  return asyncAction(name, () => cache.clearAuthToken(id), "cache")
}

export function operation (name, props) {
  const [chunkName, kind, operationName] = name.split("/")
  if (!props.chunky.chunk.operations || !props.chunky.chunk.operations[operationName]) {
    return Promise.reject(errors.UNDEFINED_OPERATION())
  }
  const operationProps = props.chunky.chunk.operations[operationName]
  const adapter = operationProps.adapter
  if (!adapter) {
    return Promise.reject(errors.UNDEFINED_OPERATION())
  }
  const operation = new adapter(Object.assign(props.chunky.api, operationProps, props))
  return asyncAction(`${chunkName}/${kind}`, () => operation.start(), "remote")
}
