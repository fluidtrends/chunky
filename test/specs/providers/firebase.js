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
    // Let's first mock the operation
    const response = { test: 'hello' }
    context.stub(operations, "register", (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
    const provider = new Data.Providers.Firebase()
    const operation = provider.operation({ type: 'register', props: { email: 'email', password: 'password', register: true }})

    // Attempt to mock register
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.user.name).to.equal('test'))
}).

add("should fail to login other than via email", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'login', nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should fail to register other than via email", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'register', nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should not retrieve a nodeless collection from firebase", (context, done) => {
    const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve' })

    // Attempt to mock
    savor.promiseShouldFail(operation, done, (error) => context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
}).

add("should retrieve a collection from firebase", (context, done) => {
    const response = { val: () => [ {id: 0}, {id: 1} ] }
    context.stub(operations, "retrieve", (firebase, options) => Promise.resolve(response))
    const provider = new Data.Providers.Firebase()

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', options: {
      latest: true
    }, props: {
      before: "1000"
    },  nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldSucceed(operation, done, (data) => {
      context.expect(data.val().length).to.equal(2)
    })
}).

add("should subscribe to a firebase collection", (context, done) => {
    // Let's first mock the join operation
    const response = { test: 'hello' }
    context.stub(operations, "subscribe", (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
    const provider = new Data.Providers.Firebase()
    const operation = provider.operation({ type: 'subscribe', options: { latest: "100" },  nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
}).

add("should perform a firebase join", (context, done) => {
    // Let's first mock the join operation
    const response = { test: 'hello' }
    context.stub(operations, "join", (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
    const provider = new Data.Providers.Firebase()
    const operation = provider.operation({ type: 'join', nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
}).

add("should perform a firebase remove", (context, done) => {
    // Let's first mock the join operation
    const response = { test: 'hello' }
    context.stub(operations, "remove", (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
    const provider = new Data.Providers.Firebase()
    const operation = provider.operation({ type: 'remove', nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldSucceed(operation, done, (data) => {})
}).

add("should perform a firebase add", (context, done) => {
    // Let's first mock the join operation
    const response = { test: 'hello' }
    context.stub(operations, "add", (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
    const provider = new Data.Providers.Firebase()
    const operation = provider.operation({ type: 'add', nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
}).

add("should perform a firebase update", (context, done) => {
    // Let's first mock the join operation
    const response = { test: 'hello' }
    context.stub(operations, "update", (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
    const provider = new Data.Providers.Firebase()
    const operation = provider.operation({ type: 'update', nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
}).

add("should perform a firebase create", (context, done) => {
    // Let's first mock the join operation
    const response = { test: 'hello' }
    context.stub(operations, "create", (firebase, options) => Promise.resolve(response))

    // Fetch an operation from the provider
    const provider = new Data.Providers.Firebase()
    const operation = provider.operation({ type: 'create', nodes: ['test'] })

    // Attempt to mock
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.test).to.equal('hello'))
}).

run ("Firebase Data Provider")
