export const type = (name, state) => `@@Chunky/${state.toUpperCase()}/${name}`
export const timestamp = () => Date.now()

export const start = (name, provider) => ({ type:  type(name, "start"), timestamp: timestamp(), provider })
export const error = (name, error, provider) => ({ type:  type(name, "error"), provider, error, timestamp: timestamp() })
export const ok = (name, data, provider) => ({ type:  type(name, "ok"), data, provider, timestamp: timestamp() })

export function asyncAction (name, operation, provider) {
  return (dispatch) => {
    dispatch(start(name, provider))
    operation().
      then(data => dispatch(ok(name, data, provider))).
      catch(err => dispatch(error(name, err, provider)))
  }
}

export function syncAction (name, operation, provider) {
  return (dispatch) => {
      dispatch(ok(name, operation(), provider))
  }
}

export function asyncActions (collection) {
  return (dispatch) => {
    collection.forEach(item => asyncAction(item.name, item.operation, item.provider)(dispatch)) 
  }
}

export function syncActions (collection) {
  return (dispatch) => {
    collection.forEach(item => syncAction(item.name, item.operation, item.provider)(dispatch)) 
  }
}