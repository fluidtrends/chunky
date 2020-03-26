const { Plugin } = require('@carmel/sdk')

class _ extends Plugin {

    constructor(props) {
        super(Object.assign({}, props, { session: { name: "chunky", console: true }}))
    }

    findCommand(id) {
        return require(`./commands/${id}`)
    }
}

module.exports = _