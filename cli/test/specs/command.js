/* eslint-disable no-unused-expressions */

const savor = require('savor')
const { Command, Environment } = require('../../src')

savor.

add('should make sure it expects required args', (context, done) => {
  const cmd = new Command({ test: "test" })

  context.expect(cmd.requiredArgs.length).to.equal(0)
  context.expect(cmd.title).to.equal("command")
  context.expect(cmd.props.test).to.equal("test")
  
  done()
}).

add('should not run', (context, done) => {
  const cmd = new Command({ env: { homeDir: context.dir }})

  context.expect(cmd.cwd).to.equal(process.cwd())
  context.expect(cmd.hasFile('test')).to.be.false

  savor.promiseShouldFail(cmd.run(), done, (error) => {
      context.expect(error.message).to.equal(Command.ERRORS.EXECUTION_FAILED())
  })
}).

run('[CLI] Core Command')
