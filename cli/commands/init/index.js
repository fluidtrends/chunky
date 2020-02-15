const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Init {
    constructor(args) {
      super(args)
    }

    exec(session) {
      return super.exec(session).then(() => {
        session.workspace.saveContext({ 
          install: {
            type: "npm"
          },
          start: {
            script: "node_modules/react-dom-chunky/bin/start"
          }
        })
        coreutils.logger.ok(`You're good to go!`)
      })
   }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})
  
  module.exports = _