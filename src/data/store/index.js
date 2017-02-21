import { createStore, applyMiddleware } from 'redux'
import promiseMiddleware                from 'redux-promise'
import thunkMiddleware                  from 'redux-thunk'
import createLogger                     from 'redux-logger'
import reducers                         from '../reducers'

// Activate logging for the middleware
const loggerMiddleware = createLogger()

// Prepare the app middleware for store injection
const loggerEnabledMiddleware = applyMiddleware(thunkMiddleware, promiseMiddleware, loggerMiddleware)
const logglessMiddleware = applyMiddleware(thunkMiddleware, promiseMiddleware)

// Create the store from the reducers
const store = (appReducers, logging = false) => createStore(reducers(appReducers), logging ? loggerEnabledMiddleware : logglessMiddleware)

// Export the store to be used by the entire app
export default store
