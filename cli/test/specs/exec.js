/* eslint-disable no-unused-expressions */

const savor = require('savor')
const exec = require('../../src/exec')
const CarmelPlugin = require('chunky-carmel-plugin')

savor.

add('should catch a failed run', (context, done) => {
  const stub = context.stub(CarmelPlugin.prototype, "run").callsFake(() => Promise.resolve())

  savor.promiseShouldSucceed(exec({ _: ["init"] }), done, (error) => {
    stub.restore()
  })
}).

run('[CLI] exec')
