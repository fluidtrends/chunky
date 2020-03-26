const Carmel = require('@carmel/sdk')

class _ extends Carmel.Commands.Unlock {
    constructor(args) {
      super(args)
    }

    exec(session) {      
      return super.exec(session)
                  .then(() => {
                    session.logger.done(`Congrats! Your data is now unlocked :)`)
                  })
                  .catch((e) => {
                    session.logger.error(e)
                  })
    }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})

  module.exports = _