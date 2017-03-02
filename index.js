import React         from 'react'
import * as Config   from './src/config'
import * as Errors   from './src/errors'

// Give apps a starter for error handling
export { default as AppError } from './src/core/Error'

// Allow the app to define custom containers
export { default as Container } from './src/core/Container'

// This is the main application wrapper and entry point
export { default as AppContainer } from './src/core/AppContainer'

// Make the common containers available to the host app
export * from './src/data/containers'

// Expose operations to the host app
export { default as RemoteOperation } from './src/data/operations/RemoteOperation'

// Allow host apps to access common configurations
export { Config }

// Give apps access to the common cache
export * from './src/data/cache'
