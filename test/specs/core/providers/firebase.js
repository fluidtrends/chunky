/* eslint-disable no-unused-expressions */

import savor from 'react-savor'
import { Data, Core, Errors } from '../../../../src'
import { operations } from 'firebaseline'

savor

.add('should fail to register other than via email', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'register', nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not retrieve a nodeless collection from firebase', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'retrieve' })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not reset from firebase without an email', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'reset' })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should reset from firebase', (context, done) => {
  // Let's first mock the join operation
  const response = { test: 'hello' }
  context.stub(operations, 'reset', (firebase, options) => Promise.resolve(response))
  global.firebase = () => {}

    // Fetch an operation from the provider
  const provider = new Data.Providers.Firebase()
  const operation = provider.operation({ type: 'reset', nodes: ['test'], props: { email: "test" } })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => {})
})

.add('should not update a nodeless collection in firebase', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'update' })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not remove a nodeless collection from firebase', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'remove' })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not add a nodeless collection to firebase', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'add' })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not subscribe to a nodeless entry in firebase', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'subscribe' })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not create a nodeless entry in firebase', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'create' })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should perform a firebase remove', (context, done) => {
  // Let's first mock the join operation
  const response = { test: 'hello' }
  context.stub(operations, 'remove', (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
  const provider = new Data.Providers.Firebase()
  const operation = provider.operation({ type: 'remove', nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => {})
})

.add('should fail to login other than via email', (context, done) => {
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'login', nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should retrieve a collection from firebase', (context, done) => {
  global.firebase = () => {}

  const response = { val: () => [ {id: 0}, {id: 1} ] }
  const stub = context.stub(operations, 'retrieve', (firebase, options) => Promise.resolve(response))
  const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
  const operation = provider.operation({ type: 'retrieve', options: {
    latest: true
  }, props: {
    before: '1000'
  }, nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => {
    context.expect(data.val().length).to.equal(2)
  })
})

.add('should subscribe to a firebase collection', (context, done) => {
  global.firebase = () => {}
    // Let's first mock the join operation
  const response = { test: 'hello' }
  context.stub(operations, 'subscribe', (firebase, options) => {
    options.onReceivedData(response)
    return Promise.resolve(response)
  })

    // Fetch an operation from the provider
  const provider = new Data.Providers.Firebase()
  const operation = provider.operation({ type: 'subscribe',
    props: { onReceivedData: (data) => true },
    options: { latest: '100', resolve: true }, nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
})

.add('should perform a firebase join', (context, done) => {
    // Let's first mock the join operation
  const response = { test: 'hello' }
  context.stub(operations, 'join', (firebase, options) => Promise.resolve(response))
  global.firebase = () => {}

    // Fetch an operation from the provider
  const provider = new Data.Providers.Firebase()
  const operation = provider.operation({ type: 'join', nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
})

.add('should perform a firebase add', (context, done) => {
    // Let's first mock the join operation
  const response = { test: 'hello' }
  context.stub(operations, 'add', (firebase, options) => Promise.resolve(response))
  global.firebase = () => {}

    // Fetch an operation from the provider
  const provider = new Data.Providers.Firebase()
  const operation = provider.operation({ type: 'add', nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
})

.add('should perform a firebase update', (context, done) => {
    // Let's first mock the join operation
  const response = { test: 'hello' }
  context.stub(operations, 'update', (firebase, options) => Promise.resolve(response))
  global.firebase = () => {}

    // Fetch an operation from the provider
  const provider = new Data.Providers.Firebase()
  const operation = provider.operation({ type: 'update', nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
})

.add('should perform a firebase create', (context, done) => {
    // Let's first mock the join operation
  const response = { test: 'hello' }
  context.stub(operations, 'create', (firebase, options) => Promise.resolve(response))
  global.firebase = () => {}

    // Fetch an operation from the provider
  const provider = new Data.Providers.Firebase()
  const operation = provider.operation({ type: 'create', nodes: ['test'] })

    // Attempt to mock
  savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
})

.run('[Core] Firebase Data Provider')
