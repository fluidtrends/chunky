/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { init } = require('../../executors')
const main = require('../../src')

savor.

add('should not init without a valid command', (context, done) => {
  const stub = context.stub(main, "setup").callsFake(() => Promise.resolve())

  savor.promiseShouldFail(init(), done, (error) => {
    context.expect(error.message).to.exist
    stub.restore()
  })
}).

add('should not init without a product name', (context, done) => {
  const stub = context.stub(main, "setup").callsFake(() => Promise.resolve())

  savor.promiseShouldFail(init({}), done, (error) => {
    context.expect(error.message).to.exist
    stub.restore()
  })
}).

add('should not init without a template', (context, done) => {
  const stub = context.stub(main, "setup").callsFake(() => Promise.resolve())

  savor.promiseShouldFail(init({ name: "test" }), done, (error) => {
    context.expect(error.message).to.exist
    stub.restore()
  })
}).

add('should not init without a bundle', (context, done) => {
  const stub = context.stub(main, "setup").callsFake(() => Promise.resolve())

  savor.promiseShouldFail(init({ name: "test", template: "test" }), done, (error) => {
    context.expect(error.message).to.exist
    stub.restore()
  })
}).

run('[CLI] Help Command')
