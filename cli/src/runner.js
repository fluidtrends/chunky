const coreutils = require("coreutils")
const Carmel = require("@carmel/sdk")

class _ {
    constructor(args) {
        this._args = Object.assign({}, args)
    }

    get args() {
        return this._args
    }

    static run(args) {
        const _this = new _(args)
        _this.exec()
    }

    get session() {
        return this._session
    }

    get command() {
        return this._command
    }

    exec() {
        this._session = new Carmel.Session({ name: _.NAME })

        try {
            // Check the command passed
            const cmd = new require(`../commands/${this.args._[0]}`)
            this._command = new cmd(this.args)

            coreutils.logger.header(_.MESSAGES.START(this.command.title))

            return this.session.initialize()
                                .then(() => Carmel.Commander.run(this.command, this.session))
                                .then(() => coreutils.logger.footer(_.MESSAGES.COMPLETION()))
                                .catch((e) => coreutils.logger.error(e))
        } catch (error) {
            coreutils.logger.error(error)
        }
    }
}

_.NAME = 'carmel'
_.MESSAGES = {
    START: (cmd) => `${cmd}`,
    COMPLETION: () => `Congrats, you did it!`
}

module.exports = _