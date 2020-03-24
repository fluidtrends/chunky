const { Plugin } = require('@carmel/sdk')

class _ extends Plugin {

    constructor(props) {
        super(Object.assign({}, props))
    }

    findCommand(id) {
        return require(`./commands/${id}`)
    }
}

module.exports = _