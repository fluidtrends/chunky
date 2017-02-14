import React         from 'react'

import * as Config   from './src/config'
import * as Errors   from './src/errors'
import * as Reducers from './src/data/reducers'
import * as Actions  from './src/data/actions'
import * as Selectors from './src/data/selectors'
import * as Utils     from './src/utils'

// Let apps use the default model
export * from './src/data/model'

// Make the common colors available to the host app
export * from './src/colors'

// Give apps a starter for error handling
export { default as AppError } from './src/core/Error'

// Allow the app to define custom containers
export { default as Container } from './src/core/Container'

// Allow the app to define custom operations
export { default as Operation } from './src/core/Operation'

// This is the main application wrapper and entry point
export { default as AppContainer } from './src/core/AppContainer'

// Give apps access to the common cache
export * from './src/data/cache'

// Allow host apps to access common configurations
export { Config, Errors, Actions, Selectors, Reducers, Utils }
