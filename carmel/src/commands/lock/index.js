const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Lock {
    constructor(args) {
      super(args)
    }

    exec(session) {      
      return super.exec(session)
                  .then(() => {
                    coreutils.logger.footer(`Congrats! Your data is now locked :)`)
                  })
   }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})

  module.exports = _