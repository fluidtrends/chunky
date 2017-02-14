export const asyncReducer = (name) => {
  return (state = {}, action) => {
    // Let's see what kind of action this is
    const [source, type, chunkName, id] = action.type.split('/')

    if (source.toLowerCase() != 'chunky') {
      // We only recognize framework actions
      return state
    }

    if (name.toLowerCase() != chunkName.toLowerCase()) {
      // We want to ignore foreign actions
      return state
    }

    // Let's compose the state now
    var newState = { timestamp: action.timestamp }

    switch (type) {
      case "START":
        newState = Object.assign(newState, { progress: true, done: false })
        break
      case "ERROR":
        newState = Object.assign(newState, { progress: false, done: true, filter: action.filter, error: action.error })
        break
      case "OK":
        newState = Object.assign(newState, { progress: false, done: true, filter: action.filter, data: action.data })
        break
      default:
        break
    }

    return newState
  }
}
