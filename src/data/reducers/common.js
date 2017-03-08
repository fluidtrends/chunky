export const asyncReducer = (name) => {
  return (state = {}, action) => {
    // Let's see what kind of action this is
    const [source, chunkName, kind, type] = action.type.split('/')

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
      case "start":
        newState = Object.assign(newState, { progress: true, done: false })
        break
      case "error":
        newState = Object.assign(newState, { progress: false, done: true, source: action.source, error: action.error })
        break
      default:
        newState = Object.assign(newState, { progress: false, done: true, source: action.source, data: action.data })
        break
    }

    return newState
  }
}
