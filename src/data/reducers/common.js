export const asyncReducer = (name) => {
  return (state = {}, action) => {
    // Let's see what kind of action this is
    const [source, type] = action.type.split('/')

    if (source.toLowerCase() != 'chunky') {
      // We only recognize framework actions
      return state
    }

    // Let's look a bit deeper into this action
    const [kind, id] = type.split(".")

    // Let's compose the state now
    var newState = { timestamp: action.timestamp }

    switch (kind) {
      case "START":
        newState = Object.assign(newState, { progress: true, done: false })
        break
      case "ERROR":
        newState = Object.assign(newState, { progress: false, done: true, error: action.error })
        break
      case "OK":
        newState = Object.assign(newState, { progress: false, done: true, data: action.data })
        break
      default:
        break
    }

    return newState
  }
}
