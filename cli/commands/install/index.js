const coreutils = require('coreutils')
const fs = require('fs-extra')
const path = require('path')
const Carmel = require('@carmel/sdk')

class _ extends Carmel.Commands.Install {
    constructor(args) {
      super(args)
    }

    exec(session) {
      return super.exec(session).then(() => {
        coreutils.logger.ok(`Installed`)
      })
   }
}

_.ERRORS = Object.assign({}, _.ERRORS, {})

module.exports = _
