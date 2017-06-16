export const asyncReducer = (name) => {
  return (state = {}, action) => {

    if (!action || Object.keys(action).length === 0 || !action.type) {
      // We don't tolerate empty actions
      return state
    }

    // Let's see what kind of action this is
    const [source, actionState, chunkName, actionName] = action.type.split('/')

    if (source.toLowerCase() != '@@chunky') {
      // We only recognize framework actions
      return state
    }

    if (!chunkName || (name.toLowerCase() != chunkName.toLowerCase())) {
      // We want to ignore foreign actions
      return state
    }

    // Figure out the flavor
    const flavor = (!action.flavor ? ['main'] : (action.flavor.split('/') || ['main']))

    // The action timestamp
    const timestamp = action.timestamp

    // The data provider
    const provider = action.provider
    
    switch (actionState.toLowerCase()) {
      case "start":
        return Object.assign({}, state, { flavor, timestamp, provider, inProgress: true, done: false })
      case "error":
        return Object.assign({}, state, { flavor, timestamp, provider, inProgress: false, done: true, 
                                          error: { [flavor]: action.error } })
      case "ok":
        var data = Object.assign({}, state.data)
        data[flavor[0]] = (flavor.length > 1 ? { [flavor[1]]: action.data } : action.data)

        return Object.assign({}, state, { flavor, timestamp, provider, inProgress: false, done: true, data })
      default:
        return state
    }
  }
}
