const Carmel = require('@carmel/sdk')

class _ extends Carmel.Commands.Lock {
    constructor(args) {
      super(args)
    }

    exec(session) {      
      return super.exec(session)
                  .then(() => {
                    session.logger.done(`Congrats! Your data is now locked :)`)
                  })
                  .catch((e) => {
                    session.logger.error(e)
                  })
    }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})

  module.exports = _