// import savor from 'react-savor'
// import { DefaultDataClient, Errors } from '../..'
//
// savor.add("should handle request timeouts", (context, done) => {
//   // Create a brand new mock client
//   const Platform = { fetch: (url, options, body) => Promise.reject(new Error('error')) }
//   global.Chunky = { Platform }
//   const client = new DefaultDataClient({ timeout: 1 })
//
//   // Let's make sure the request will fail
//   savor.promiseShouldFail(client.sendRequest("POST", "/", { test: "test" }), done, () => {})
// }).
//
// add("should handle requests without a body that fail", (context, done) => {
//   // Create a brand new mock client
//   const Platform = { fetch: (url, options, body) => Promise.reject(new Error('error')) }
//   global.Chunky = { Platform }
//   const client = new DefaultDataClient()
//   context.expect(client).to.exist
//
//   // Let's make sure the request will fail
//   savor.promiseShouldFail(client.sendRequest("GET", "/"), done, () => {})
// }).
//
// add("should handle requests with a body that fail", (context, done) => {
//   // Create a brand new mock client
//   const Platform = { fetch: (url, options, body) => Promise.reject(new Error('error')) }
//   global.Chunky = { Platform }
//   const client = new DefaultDataClient()
//
//   // Let's make sure the request will fail
//   savor.promiseShouldFail(client.sendRequest("POST", "/", { test: "test" }), done, () => {})
// }).
//
// add("should be able to handle an empty response", (context, done) => {
//   // Create a brand new mock client
//   const response = { status: 500, json: () => undefined }
//   const Platform = { fetch: (url, options, body) => Promise.resolve(response) }
//   global.Chunky = { Platform }
//   const client = new DefaultDataClient()
//
//   // Let's make sure the request will return the expected response that contains an error
//   savor.promiseShouldSucceed(client.sendRequest("POST", "/", { test: "test" }), done, (response) => {
//     context.expect(response).to.exist
//     context.expect(response.status).to.equal(500)
//     context.expect(response.warning).to.equal(Errors.WARNING_EMPTY_RESPONSE)
//     context.expect(response.data).to.be.empty
//   })
// }).
//
// add("should handle invalid json responses", (context, done) => {
//   // Create a brand new mock client
//   const response = { status: 500, json: () => Promise.reject(new Error('error')) }
//   const Platform = { fetch: (url, options, body) => Promise.resolve(response) }
//   global.Chunky = { Platform }
//   const client = new DefaultDataClient()
//
//   // Let's make sure the request will return an invalid json response
//   savor.promiseShouldSucceed(client.sendRequest("POST", "/", { test: "test" }), done, (response) => {
//     context.expect(response).to.exist
//     context.expect(response.status).to.equal(500)
//     context.expect(response.warning).to.equal(Errors.WARNING_INVALID_RESPONSE)
//     context.expect(response.data).to.be.empty
//   })
// }).
//
// add("should handle valid json responses", (context, done) => {
//   // Create a brand new mock client
//   const response = { status: 200, json: () => Promise.resolve({ testing: "testing" }) }
//   const Platform = { fetch: (url, options, body) => Promise.resolve(response) }
//   global.Chunky = { Platform }
//   const client = new DefaultDataClient()
//
//   // Let's make sure the request will return our expected valid json response
//   savor.promiseShouldSucceed(client.sendRequest("POST", "/", { test: "test" }), done, (response) => {
//     context.expect(response).to.exist
//     context.expect(response.status).to.equal(200)
//     context.expect(response.data).to.be.exist
//     context.expect(response.data.testing).to.equal('testing')
//   })
// }).
//
// run("Default Data Client")
