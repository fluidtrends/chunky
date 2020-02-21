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

add('should run a command', (context, done) => {
  //TODO stub out the npm download call
  Runner.run({ _: ["init"], name: "test", template: "hey" })
  
  done()
}).

run('[CLI] Runner')
