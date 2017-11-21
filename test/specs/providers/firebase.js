import savor from 'react-savor'
import { Data, Core, Errors } from '../../..'
import { operations } from 'firebaseline'

savor.add("should login to firebase", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Inject a mock adapter
    const user = { toJSON: () => ({ name: 'test' }) }
    global.storage = { setItem: (key, value, callback) => callback(null, user) }

    // Inject another mock adapter
    global.firebase = { auth: () => ({
      signInWithEmailAndPassword: (email, password) => Promise.resolve(user)
    })}

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'login', props: { email: 'email', password: 'password', login: true }})

    // Force the operation to succeed
    context.stub(operations, "login", (firebase, options) => Promise.resolve(user))

    // Attempt to mock login
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.user.name).to.equal('test'))
}).

add("should register to firebase", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Inject a mock adapter
    const user = { toJSON: () => ({ name: 'test' }) }
    global.storage = { setItem: (key, value, callback) => callback() }

    // Inject another mock adapter
    global.firebase = { auth: () => ({
      createUserWithEmailAndPassword: (email, password) => Promise.resolve(user)
    })}

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'login', props: { email: 'email', password: 'password', register: true }})

    // Attempt to mock register
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.user.name).to.equal('test'))
}).

add("should fail to login other than via email", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'login', nodes: ['test'] })

    // Attempt to mock retrieve
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should fail to register other than via email", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'register', nodes: ['test'] })

    // Attempt to mock retrieve
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should not retrieve a nodeless collection from firebase", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve' })

    // Attempt to mock retrieve
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should retrieve a collection from firebase", (context, done) => {
    const provider = new Data.Providers.Firebase()

    const data = { val: () => [ {id: 0}, {id: 1} ] }

    // Inject a mock adapter
    global.firebase = { database: () => ({
      ref: (resource) => ({
        once: (type, callback) => Promise.resolve(data)
      })
    })}

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to mock retrieve
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.length).to.equal(2))
}).

run ("Firebase Data Provider")
