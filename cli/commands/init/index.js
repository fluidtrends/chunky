const Carmel = require('@carmel/sdk')
const coreutils = require('coreutils')

class _ extends Carmel.Commands.Init {
    constructor(args) {
      super(args)
    }

    exec(session) {
      const templateProps = {}
      
      return super.exec(session)

                  // Create the workspace context
                  .then(() => {
                    coreutils.logger.ok("Created the workspace")
                    return session.workspace.saveContext(_.CONTEXT())
                  })

                  // Install the required archive, if necessary
                  .then(() => { 
                    coreutils.logger.ok("Initialized the context")
                    return session.index.installArchive(this.archive)
                  })

                  // Let's load up the archive first
                  .then((archive) => { 
                    coreutils.logger.ok("Prepared the bundle")
                    return archive.load()
                  })

                  // Find the template, if any
                  .then((archive) => { 
                    coreutils.logger.ok("Initialized the bundle")
                    if (archive.templates && this.template && archive.templates[this.template.path]) {
                      return archive.templates[this.template.path].load(templateProps)
                    }
                  })

                  .then((template) => {
                      if (!template) {
                        coreutils.logger.error(`The template is invalid`)
                        return 
                      }

                      coreutils.logger.ok("Found the template")
                      template.save(session.workspace.dir, {}).then(() => {
                        coreutils.logger.footer(`Congrats! Enjoy your new product :)`)
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