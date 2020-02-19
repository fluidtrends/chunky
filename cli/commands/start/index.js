const coreutils = require('coreutils')
const fs = require('fs-extra')
const path = require('path')
const Carmel = require('@carmel/sdk')

class _ extends Carmel.Commands.Start {
    constructor(args) {
      super(args)
    }

    load(session) {
      this._port = "8081"
      this._config = {}
      this._secure = {}
      this._chunks = session.workspace.findDirs('chunks')
    }

    get execArgs() {
      return { port: this._port, config: this.config, secure: this.secure, chunks: this.chunks }
    }

    exec(session) {
      this.load(session)
      return super.exec(session).then(() => {
        coreutils.logger.ok(`Started ...`)
      })
   }
}

_.ERRORS = Object.assign({}, _.ERRORS, {})

module.exports = _
