/* eslint-disable no-unused-expressions */

const savor = require('savor')
const Runner = require('../../src/Runner')
const coreutils = require('coreutils')

savor.

add('should catch a failed run', (context, done) => {
  context.replace(coreutils, "logger", { ok: () => {}, error: () => {}, header: () => {}, footer: () => {} })

  Runner.run()
  done()
}).

add('should catch a failed command execution', (context, done) => {
  Runner.run({ _: ["init"], name: "test" })
  
  done()
}).

add('should run an init command', (context, done) => {
  Runner.run({ _: ["init"], name: "test", template: "hey" })
  
  done()
}).

run('[CLI] Runner')
