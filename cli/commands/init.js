const Carmel = require('@carmel/sdk')
 
class _ extends Carmel.Commands.Init {
    constructor(args) {
      super(args)
    }

    initialize() {
      return super.initialize()
    }
  
    exec() {
      return super.exec()
   }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})
  
  module.exports = _