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

    // Let's compose the state now
    var newState = { timestamp: action.timestamp, inProgress: false, done: true, provider: action.provider }

    // Figure out the flavor
    const flavor = action.flavor || 'main'

    switch (actionState.toLowerCase()) {
      case "start":
        newState = Object.assign(newState, { inProgress: true, done: false })
        break
      case "error":
        newState = Object.assign(newState, { error: { [flavor]: action.error }})
        break
      case "ok":
        newState = Object.assign(newState, { data: { [flavor]: action.data }})
        break
      default:
        return state
    }

    return newState
  }
}
