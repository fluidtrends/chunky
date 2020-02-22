/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Commander } = require("@carmel/sdk")
const Plugin = require('../..')
const coreutils = require('coreutils')

savor.

add('should catch a failed command execution', (context, done) => {
  context.replace(coreutils, "logger", { ok: () => {}, error: () => {}, header: () => {}, footer: () => {} })
  const plugin = new Plugin({ command: { id: "init" }})

  savor.promiseShouldFail(plugin.run(), done, (error) => {
    context.expect(error.message).to.equal(Commander.ERRORS.MISSING_ARG('name'))
  })
}).

add('should run a command', (context, done) => {
  const plugin = new Plugin({ command: { id: "init", args: {
    name: "test",
    template: "test"
  }}})

  savor.promiseShouldSucceed(plugin.run(), done, (data) => {
  })
}).

run('[Chunky Carmel Plugin] Main')
