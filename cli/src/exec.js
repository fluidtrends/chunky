const CarmelPlugin = require('chunky-carmel-plugin')

module.exports = (args) => {
    const command = Object.assign({}, { args }, { id: args._[0] })
    const plugin = new CarmelPlugin({ command })

    return plugin.run()
}