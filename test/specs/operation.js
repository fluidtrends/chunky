import savor from 'react-savor'
import { Core, Data, Config, Errors } from '../..'

savor.add("should create a basic post operation", (context, done) => {
  // Create a POST operation
  const post = new Core.Operation.POST({})
  context.expect(post.method).to.equal(Config.API_POST_METHOD)
  done()
}).

add("should create a basic auth headers", (context, done) => {
  // Create a POST operation
  const post = new Core.Operation.POST({})

  // Add a base64 basic auth header
  post.addAuthHeader('Basic', 'test', true)
  context.expect(post.headers.Authorization).to.equal('Basic dGVzdA==')

  // Add a plain basic auth header
  post.addAuthHeader('Basic', 'test')
  context.expect(post.headers.Authorization).to.equal('Basic test')

  // Do not add missing auth tokens
  // post.addAuthToken()
  // context.expect(post.headers.Authorization).to.equal('Basic test')
  //
  // // Do not add missing auth credentials
  // post.addAuthCredentials()
  // context.expect(post.headers.Authorization).to.equal('Basic test')
  //
  // // Add an auth token
  // post.addAuthToken('testing')
  // context.expect(post.headers.Authorization).to.equal(`${Config.API_DEFAULT_AUTH_TYPE} testing`)
  //
  // // Add base64 auth credentials
  // post.addAuthCredentials('user', 'pass', 'Basic', true)
  // context.expect(post.headers.Authorization).to.equal('Basic dXNlcjpwYXNz')
  //
  // // Add plain auth credentials
  // post.addAuthCredentials('user', 'pass', 'Basic')
  // context.expect(post.headers.Authorization).to.equal('Basic user:pass')

  done()
}).

add("should create a custom operation", (context, done) => {
  // Create a custom operation
  const operation = new Core.Operation({
    email: 'test',
    body: {
      item: "value",
      username: 'email'
    }
  })

  // Let's make sure the operation is initialized with default values
  context.expect(operation.headers.Accept).to.equal(Config.API_JSON_CONTENT_TYPE)
  context.expect(operation.method).to.equal(Config.API_DEFAULT_METHOD)
  context.expect(operation.serverUrl).to.equal(Config.API_DEFAULT_SERVER_URL)
  context.expect(operation.timeout).to.equal(Config.API_DEFAULT_TIMEOUT)
  context.expect(operation.endpoint).to.equal(Config.API_DEFAULT_ENDPOINT)
  context.expect(operation.authType).to.equal(Config.API_DEFAULT_AUTH_TYPE)
  context.expect(operation.isSecure).to.equal(Config.API_DEFAULT_SECURE)

  // Make sure we have a body
  context.expect(operation.body.username).to.equal('test')
  context.expect(operation.body.item).to.equal('value')

  done()
}).

add("should handle public failed operations", (context, done) => {
  // Create a brand new mock client
  global.fetch = (url, options, body) => Promise.reject(new Error('error'))

  // Create a POST operation
  const post = new Core.Operation.POST({
    email: 'test',
    username: 'username',
    password: 'password',
    auth: {
      username: 'username',
      password: 'password'
    },
    headers: {
      dummy: 'test'
    },
    body: {
      email: 'email'
    }
  })

  savor.promiseShouldFail(post.start(), done, () => {})
}).

add("should handle secure failed operations", (context, done) => {
  // Create a brand new mock client
  global.fetch = (url, options, body) => Promise.reject(new Error('error'))

  // Create a POST operation
  const post = new Core.Operation.POST({
    email: 'test',
    secure: true,
    username: 'username',
    password: 'password',
    auth: {
      type: 'Basic',
      base64: true,
    },
    headers: {
      dummy: 'test'
    },
    body: {
      email: 'email'
    }
  })
  savor.promiseShouldFail(post.start(), done, () => {})
}).


add("should handle bodyless failed operations", (context, done) => {
  // Create a brand new mock client
  global.fetch = (url, options, body) => Promise.reject(new Error('error'))

  // Create a POST operation
  const post = new Core.Operation.POST({
    email: 'test',
    username: 'username',
    password: 'password'
  })

  savor.promiseShouldFail(post.start(), done, () => {})
}).

add("should handle operations timeout", (context, done) => {
  global.fetch = (url, options, body) => Promise.reject(Errors.TIMEOUT_ERROR)

  // Create a POST operation
  const post = new Core.Operation.POST({
    timeout: 1
  })

  savor.promiseShouldFail(post.start(), done, () => {})
}).

add("should handle empty responses", (context, done) => {
  global.fetch = (url, options, body) => Promise.resolve()

  // Create a POST operation
  const post = new Core.Operation.POST({})

  savor.promiseShouldSucceed(post.start(), done, (data) => {})
}).

add("should handle invalid responses", (context, done) => {
  global.fetch = (url, options, body) => Promise.resolve({ json: () => Promise.reject(new Error('parse error')) })

  // Create a POST operation
  const post = new Core.Operation.POST({})

  savor.promiseShouldSucceed(post.start(), done, (data) => {})
}).

add("should handle valid responses", (context, done) => {
  global.fetch = (url, options, body) => Promise.resolve({ json: () => Promise.resolve({ test: 'test' }) })

  // Create a POST operation
  const post = new Core.Operation.POST({})

  savor.promiseShouldSucceed(post.start(), done, (data) => {})
}).

run("Data Operations")
