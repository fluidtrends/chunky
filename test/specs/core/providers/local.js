/* eslint-disable no-unused-expressions */

import savor from 'react-savor'
import { Data, Errors } from '../../../../src'

savor

.add('should remove from local', (context, done) => {
  const provider = new Data.Providers.Local()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'delete', nodes: ['test'] })

    // Attempt to delete
  savor.promiseShouldSucceed(operation, done, () => {})
})

.add('should retrieve from local', (context, done) => {
  const provider = new Data.Providers.Local()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to delete
  savor.promiseShouldSucceed(operation, done, () => {})
})

.run('[Core] Local Data Providers')
