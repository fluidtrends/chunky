const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Unlock {
    constructor(args) {
      super(args)
    }

    exec(session) {      
      return super.exec(session)
                  .then(() => {
                    coreutils.logger.footer(`Congrats! Your data is now unlocked :)`)
                  })
                  .catch((e) => {
                    console.log(e)
                    coreutils.logger.error(e)
                  })
    }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})

  module.exports = _