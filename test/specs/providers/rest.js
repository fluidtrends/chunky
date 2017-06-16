import savor from 'react-savor'
import { Data, Core, Errors } from '../../..'

savor.add("should handle a failed collection retrieval", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Inject a mock adapter
    global.fetch = (url, options) => Promise.reject(new Error('oopsie'))

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to retrieve
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal('oopsie'))
}).

add("should not retrieve a nodeless collection", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve' })

    // Attempt to retrieve
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should retrieve a collection", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Inject a mock adapter
    global.fetch = (url, options) => Promise.resolve({ json: () => Promise.resolve([{ id: 0 }, { id: 1 }]) })

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to retrieve
    savor.promiseShouldSucceed(operation, done, (response) => context.expect(response.data.length).to.equal(2))
}).

add("should handle a timeout", (context, done) => {
    const provider = new Data.Providers.Rest()

    // Inject a mock adapter
    global.setTimeout = (callback) => callback()

    // Inject another mock adapter
    global.fetch = (url, options) => Promise.resolve({ json: () => Promise.resolve([{ id: 0 }, { id: 1 }]) })

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to retrieve
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.TIMEOUT_ERROR().message))
}).

add("should retrieve an empty collection", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Inject a mock adapter
    global.fetch = (url, options) => Promise.resolve()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to retrieve
    savor.promiseShouldSucceed(operation, done, (response) => context.expect(response.warning).to.equal(Errors.WARNING_EMPTY_RESPONSE))
}).

add("should retrieve an invalid collection", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Inject a mock adapter
    global.fetch = (url, options) => Promise.resolve({ json: () => Promise.reject(new Error('oopsie')) })

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to retrieve
    savor.promiseShouldSucceed(operation, done, (response) => context.expect(response.warning).to.equal(Errors.WARNING_INVALID_RESPONSE))
}).

add("should create a new node with options", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Inject a mock adapter
    global.fetch = (url, options) => Promise.resolve({ json: () => Promise.resolve([{ id: 0 }, { id: 1 }]) })

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'create', nodes: ['test'], props: { hello: 'world' } })

    // Attempt to retrieve
    savor.promiseShouldSucceed(operation, done, (response) => context.expect(response.data.length).to.equal(2))
}).

add("should create a new node without any options", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Inject a mock adapter
    global.fetch = (url, options) => Promise.resolve({ json: () => Promise.resolve([{ id: 0 }, { id: 1 }]) })

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'create', nodes: ['test'] })

    // Attempt to createcreate
    savor.promiseShouldSucceed(operation, done, (response) => context.expect(response.data.length).to.equal(2))
}).

add("should note create a new node without a specified node", (context, done) => {
    const provider = new Data.Providers.Rest()
     
    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'create' })

    // Attempt to create
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

run ("Rest Data Provider")
