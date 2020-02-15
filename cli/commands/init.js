const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Init {
    constructor(args) {
      super(args)
    }

    exec(session) {
      return super.exec(session).then(() => {
        coreutils.logger.ok(`You're good to go!`)
      })
   }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})
  
  module.exports = _