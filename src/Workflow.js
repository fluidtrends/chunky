const _index = require('../index.json')
const _services = require('./services')

class _ {
    constructor(props) {
        this._props = props
    }
 
    get props() {
        return this._props
    }

    get services () {
        return _services
    }

    get index() {
        return _index
    }

    get id () {
        return this.props.id
    }

    async run() {
        return Promise.all(Object.keys(_services).map(name => _services[name].init()))
    }
}

module.exports = _