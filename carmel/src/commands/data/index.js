const Carmel = require('@carmel/sdk')

class _ extends Carmel.Commands.Data {
    constructor(args) {
      super(args)
    }

    exec(session) {      
      return super.exec(session)
                  .then(() => {
                    session.logger.done(`Congrats!`)
                  })
                  .catch((e) => {
                    session.logger.error(e)
                  })
    }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})

  module.exports = _