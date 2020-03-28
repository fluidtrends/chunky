const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Init {
    constructor(args) {
      super(args)
    }

    exec(session) {
      const templateProps = {}
      
      session.logger.info("Creating the workspace")

      return super.exec(session)
                  // Create the workspace context
                  .then(() => {
                    // return session.workspace.saveContext(_.CONTEXT())
                  })

                  // Install the required archive, if necessary
                  .then(() => { 
                    session.logger.info("Installing the template")
                    return session.index.installArchive(this.archive)
                  })

                  // Let's load up the archive first
                  .then((archive) => { 
                    session.logger.info("Preparing the template")
                    return archive.load()
                  })

                  // Find the template, if any
                  .then((archive) => { 
                    if (archive.templates && this.template && archive.templates[this.template.path]) {
                      return archive.templates[this.template.path].load(templateProps)
                    }
                  })

                  .then((template) => {
                      if (!template) {
                        session.logger.error(`The template is invalid`)
                        return 
                      }

                      template.save(session.workspace.dir, {}).then(() => {
                        session.logger.done(`Congrats! Enjoy your new product :)`)
                      })
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