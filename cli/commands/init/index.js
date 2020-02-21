const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Init {
    constructor(args) {
      super(args)
    }

    exec(session) {
      return super.exec(session)
                  .then(() => {
                    session.workspace.saveContext({ 
                      install: {
                        type: "npm"
                      },
                      start: {
                        script: "node_modules/react-dom-chunky/bin/start"
                      }
                    })
                  })
                  .then(() => session.index.installArchive(this.archive))
                  .then((archive) => archive.load())
                  .then((archive) => {
                    console.log(archive.files)
                  })
                  // .then((archive) => archive.save(session.workspace.dir, this.args))
                  .then(() => {
                      coreutils.logger.ok(`You're good to go!`)
                  })

   }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})
  
  module.exports = _