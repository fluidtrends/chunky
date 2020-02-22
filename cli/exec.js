const Carmel = require('@carmel/sdk')
const ChunkyPlugin = require('chunky-carmel-plugin')

// Use the Chunky plugin
Carmel.use(ChunkyPlugin)

module.exports = (args) => {
    const command = args._[0]
    delete args._
    Carmel.run(command, args)
}