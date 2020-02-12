const cmd = require('./command')
const runner = require('../../src/runner')

module.exports = (args) => {
    runner(cmd, args)
}