import savor from 'react-savor'
import { Data, Errors, Config, Core } from '../..'

savor.add("should execute a failing async action", (context, done) => {
  const operation = () => Promise.reject(new Error('oopsie'))
  const thunk = Data.Actions.common.asyncAction('test', operation, {})

  var stage = 0
  thunk((action) => {

    // We want to make sure we don't get any OK actions
    context.expect(action.type).to.not.equal(`@@Chunky/OK/test`)

    // Make sure each of the expected actions gets triggered
    context.expect(action.type).to.equal(`@@Chunky/${stage === 0 ? 'START' : 'ERROR'}/test`)

    if (stage++ === 0) {
      // We want to finish up on the second stage
      return
    }

    // Check the final stage
    context.expect(action.error.message).to.equal('oopsie')
    done()
  })
}).

add("should execute a succeeding async action", (context, done) => {
  const operation = () => Promise.resolve({ hello: 'world' })
  const thunk = Data.Actions.common.asyncAction('test', operation, {})

  var stage = 0
  thunk((action) => {

    // We want to make sure we don't get any ERROR actions
    context.expect(action.type).to.not.equal(`@@Chunky/ERROR/test`)

    // Make sure each of the expected actions gets triggered
    context.expect(action.type).to.equal(`@@Chunky/${stage === 0 ? 'START' : 'OK'}/test`)

    if (stage++ === 0) {
      // We want to finish up on the second stage
      return
    }

    // Check the final stage
    context.expect(action.data.hello).to.equal('world')
    done()
  })
}).


run ("Data Actions")
