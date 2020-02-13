const path = require('path')
const fs = require('fs-extra')

class _ {
    constructor(props) {
        this._props = Object.assign({}, props)
    }

    // TO BE IMPLEMENTED BY CHILDREN
    get requiredArgs() { return [] }
    get title() { return "command" }
    exec() { return Promise.reject(new Error(_.ERRORS.EXECUTION_FAILED())) }
    initialize() { return Promise.resolve() }
    
    get props() {
        return this._props
    }

    get cache() {
        return this._cache
    }

    get env () {
        return this._env
    }

    get args () {
        return this._args
    }

    get missingRequiredArgs() {
        return this.requiredArgs.filter(arg => {
            return (!this.args || !this.args[arg])
        })
    }

    get cwd() {
        return process.cwd()
    }

    hasFile (filepath) {
        return fs.existsSync(path.resolve(this.cwd, filepath))
    }

    run (args) {
        this._args = Object.assign({}, args)

        const missing = this.missingRequiredArgs

        if (missing && missing.length > 0) {
            return Promise.reject(new Error(_.ERRORS.MISSING_ARG(missing[0])))
        }

        // // Let's load the cache
        // this._cache = new Cache()

        // // Make sure the environment and then execute the command
        // return this.env.initialize(args)
        //                .then(() => this.initialize())
        //                .then(() => this.cache.initialize())
        //                .then(() => this.exec())
    }
}

_.ERRORS = {
    MISSING_ARG: (arg) => `Missing [${arg}] argument`,
    EXECUTION_FAILED: (reason) => reason ? `Execution failed because ${reason}`: `Execution failed`,
    ALREADY_EXISTS: (name) => name ? `The ${name} already exists` : `Already exists`
}

module.exports = _
