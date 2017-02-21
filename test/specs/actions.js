import savor from 'react-savor'
import { Data, Errors, Config, Core } from '../..'

savor.add("should execute a cache action", (context, done) => {
  global.localStorage = { removeItem: (key, callback) => callback() }
  const action = Data.Actions.common.deleteFromCache('token', Config.AUTH_TOKEN_CACHE_KEY)
  action((data) => (data.type === 'Chunky/OK/TOKEN') && done())
}).

add("should not execute a missing operation", (context, done) => {
  const props = { chunky: { chunk: { operations: {} } } }
  savor.promiseShouldFail(Data.Actions.common.operation('name/kind/op', props), done, () => {})
}).

add("should not execute an operation without an adapter", (context, done) => {
  const props = { chunky: { chunk: { operations: { op: {} } } } }
  savor.promiseShouldFail(Data.Actions.common.operation('name/kind/op', props), done, () => {})
}).

add("should handle operation failures", (context, done) => {
  // Mock the request
  global.fetch = (url, options, body) => Promise.reject(new Error('error'))

  const adapter = Core.Operation
  const props = { chunky: { api: {}, chunk: { operations: { op: { adapter }}}}}
  const action = Data.Actions.common.operation('name/kind/op', props)

  action((data) => (data.type === 'Chunky/ERROR/NAME/KIND') && done())
}).

run ("Data Actions")
