import * as cache from '../cache'
import * as errors from '../../errors'

export const type = (name, kind) => `Chunky/${kind.toUpperCase()}.${name.toUpperCase()}`
export const timestamp = () => Date.now()

export const start = (name) => ({ type:  type(name, "start"), timestamp: timestamp() })
export const error = (name, error) => ({ type:  type(name, "error"), error, timestamp: timestamp() })
export const ok = (name, data) => ({ type:  type(name, "ok"), timestamp: timestamp() })

export function asyncAction (name, operation) {
  return (dispatch) => {
    dispatch(start(name))
    operation().
          then(data => dispatch(ok(name), data)).
          catch(err => dispatch(error(name, err)))
  }
}

export function getFromCache (name, id) {
  return asyncAction(name, () => cache.retrieveCachedItem(id))
}

export function operation (name, props) {
  const [chunkName, operationName] = name.split("/")
  if (!props.chunky.chunk.operations || !props.chunky.chunk.operations[operationName]) {
    return Promise.reject(errors.UNDEFINED_OPERATION())
  }
  const operationProps = props.chunky.chunk.operations[operationName]
  const adapter = operationProps.adapter
  if (!adapter) {
    return Promise.reject(errors.UNDEFINED_OPERATION())
  }
  const operation = new adapter(Object.assign(props.chunky.api, operationProps))
  return asyncAction(chunkName, () => operation.send())
}
