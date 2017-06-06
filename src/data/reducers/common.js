export const asyncReducer = (name) => {
  return (state = {}, action) => {
    // Let's see what kind of action this is
    const [source, actionState, chunkName, actionName] = action.type.split('/')

    if (source.toLowerCase() != '@@chunky') {
      // We only recognize framework actions
      return state
    }

    if (name.toLowerCase() != chunkName.toLowerCase()) {
      // We want to ignore foreign actions
      return state
    }

    // Let's compose the state now
    var newState = { timestamp: action.timestamp }
    
    // Figure out the flavor
    const flavor = action.flavor || 'main'

    switch (actionState.toLowerCase()) {
      case "start":
        newState = Object.assign(newState, { inProgress: true, done: false, provider: action.provider })
        break
      case "error":
        newState = Object.assign(newState, { inProgress: false, done: true, provider: action.provider, error: action.error })
        break
      default:
        newState = Object.assign(newState, { inProgress: false, done: true, provider: action.provider, data: { [flavor]: action.data }})
        if (flavor === 'main' && !action.data) {
          delete newState.data
        }
        break
    }

    return newState
  }
}
