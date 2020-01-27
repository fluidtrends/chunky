/* eslint-disable no-unused-expressions */

import savor from 'react-savor'
import { Data, Core, Errors } from '../../..'

savor

.add('should create a new node with options', (context, done) => {
  const provider = new Data.Providers.Rest({ timeout: 200 })

    // Inject a mock adapter
  global.fetch = (url, options) => Promise.resolve({ json: () => Promise.resolve([{ id: 0 }, { id: 1 }]) })

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'create', nodes: ['test'], props: { hello: 'world' } })

    // Attempt to retrieve
  savor.promiseShouldSucceed(operation, done, (response) => context.expect(response.length).to.equal(2))
})


.add('should not retrieve a nodeless collection', (context, done) => {
  const provider = new Data.Providers.Rest({ timeout: 200 })

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'retrieve' })

    // Attempt to retrieve
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add("should handle a timeout", (context, done) => {
  const provider = new Data.Providers.Rest({ timeout: 200 })

  // Inject a mock adapter
  global.setTimeout = (callback) => callback()

  // Inject another mock adapter
  global.fetch = (url, options) => Promise.resolve({ json: () => Promise.resolve([{ id: 0 }, { id: 1 }]) })

  // Fetch an operation from the provider
  const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

  // Attempt to retrieve
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.TIMEOUT_ERROR().message))
})

.add('should note create a new node without a specified node', (context, done) => {
  const provider = new Data.Providers.Rest({ timeout: 200 })

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'create' })

    // Attempt to create
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.run('Rest Data Provider')
