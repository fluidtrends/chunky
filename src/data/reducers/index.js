import { combineReducers } from 'redux'

// Load common reducers
import auth from './auth'
import user from './user'
const commonReducers = { auth, user }

// Create the root reducer
const reducers = (appReducers) => combineReducers(Object.assign(commonReducers, appReducers))

export default reducers
