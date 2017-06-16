import savor from 'react-savor'
import { Data, Core, Errors } from '../..'

savor.add("should be able to initialize providers without options", (context, done) => {
    const provider = new Core.DataProvider()
    context.expect(provider.props).to.not.exist
    done()     
}).

add("should be able to initialize providers with options", (context, done) => {
    const provider = new Core.DataProvider({ hello: 'world' })
    context.expect(provider.props.hello).to.equal('world')
    done()     
}).

add("should not be able to fetch an optionless operation", (context, done) => {
    const provider = new Core.DataProvider()
    
    savor.promiseShouldFail(provider.operation(), done, (error) => 
        context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should not be able to fetch a typeless operation", (context, done) => {
    const provider = new Core.DataProvider()
    
    savor.promiseShouldFail(provider.operation({}), done, (error) => 
        context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should not be able to fetch an unknown operation", (context, done) => {
    const provider = new Core.DataProvider()
    
    savor.promiseShouldFail(provider.operation({ type: 'dummy' }), done, (error) => 
        context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should create into cache", (context, done) => {
    const provider = new Data.Providers.Cache()
     
    // Inject a mock adapter
    global.localStorage = { setItem: (key, value, callback) => callback() }

    // Attempt to cache an auth token
    savor.promiseShouldSucceed(provider.operation({ type: 'create', nodes: ['test'], props: { hello: 'world' } }), done, () => {})
}).

add("should retrieve from cache", (context, done) => {
    const provider = new Data.Providers.Cache()
     
    // Inject a mock adapter
    global.localStorage = { getItem: (key, callback) => callback(null, JSON.stringify({ test: "test" })) }

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to cache an auth token
    savor.promiseShouldSucceed(operation, done, (value) => context.expect(value.test).is.equal("test"))
}).

run ("Data Providers")
