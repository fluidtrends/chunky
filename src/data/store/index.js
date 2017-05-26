import {
  createStore,
  applyMiddleware,
  compose
} from 'redux'
import {
  composeWithDevTools
} from 'remote-redux-devtools'
import { reactotronRedux } from 'reactotron-redux'
import promiseMiddleware  from 'redux-promise'
import thunkMiddleware    from 'redux-thunk'
import createLogger       from 'redux-logger'
import reducers           from '../reducers'

// Prepare the app middleware for store injection
const middleware = applyMiddleware(thunkMiddleware, promiseMiddleware, createLogger())

// Setup the dev tools composer
// const composeEnhancers = composeWithDevTools({
//   name: 'Chunky',
//   hostname: 'localhost',
//   port: 8000,
//   realtime: true
// })
// const enhancer = composeEnhancers(middleware)
// Create the store from the reducers and enhancer
// const store = (appReducers) => createStore(reducers(appReducers), enhancer)

const store = Reactotron.createStore(reducers(appReducers), compose(middleware))

// Export the store to be used by the entire app
export default store
