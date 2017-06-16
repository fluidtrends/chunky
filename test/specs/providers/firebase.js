import savor from 'react-savor'
import { Data, Core, Errors } from '../../..'

savor.add("should login to firebase", (context, done) => {
    const provider = new Data.Providers.Firebase()
     
    // Inject a mock adapter
    global.localStorage = { setItem: (key, value, callback) => callback() }
   
    // Inject another mock adapter
    global.firebase = { auth: () => ({ 
        signInWithEmailAndPassword: (email, password) => Promise.resolve({ name: 'test' }) 
    })}  

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'login', nodes: ['email'] })

    // Attempt to mock login
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.user.name).to.equal('test'))
}).

add("should register to firebase", (context, done) => {
    const provider = new Data.Providers.Firebase()
     
    // Inject a mock adapter
    global.localStorage = { setItem: (key, value, callback) => callback() }
   
    // Inject another mock adapter
    global.firebase = { auth: () => ({ 
        createUserWithEmailAndPassword: (email, password) => Promise.resolve({ name: 'test' }) 
    })}  

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'register', nodes: ['email'] })

    // Attempt to mock register
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.user.name).to.equal('test'))
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
     
    // Inject a mock adapter
    global.firebase = { database: () => ({ 
        ref: (resource) => ({ on: (type, callback) => callback({ val: () => [ {id: 0}, {id: 1} ] })})
    })}  

    // Fetch an operation from the provider
    const operation = provider.operation({ type: 'retrieve', nodes: ['test'] })

    // Attempt to mock retrieve
    savor.promiseShouldSucceed(operation, done, (data) => context.expect(data.length).to.equal(2))
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

run ("Firebase Data Provider")
