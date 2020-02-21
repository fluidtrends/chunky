const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Init {
    constructor(args) {
      super(args)
    }

    exec(session) {
      return super.exec(session)

                  // Create the workspace context
                  .then(() => session.workspace.saveContext(_.CONTEXT()))

                  // Install the required archive, if necessary
                  .then(() => session.index.installArchive(this.archive))

                   // Let's load up the archive first
                  .then((archive) => archive.load())

                  // TODO: load the template and save it to the workspace

                  .then(() => {
                      coreutils.logger.ok(`You're good to go!`)
                  })

   }
  }
  
  _.ERRORS = Object.assign({}, _.ERRORS, {})
  _.DEFAULT_INSTALLER = 'npm'
  _.DEFAULT_START_SCRIPT = 'node_modules/react-dom-chunky/bin/start.js'

  _.CONTEXT = (archive) => Object.assign({}, {
    _: { archive },
    install: { type: _.DEFAULT_INSTALLER },
    start: { script: _.DEFAULT_START_SCRIPT }
  })

  module.exports = _