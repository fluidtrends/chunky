const coreutils = require('coreutils')
const ios = require('./ios')
const android = require('./android')
const desktop = require('./desktop')
const web = require('./web')

function parseCommand (command) {
  if (command.platforms.length === 0) {
    command.platforms = ['ios', 'android', 'web', 'desktop']
  }

  coreutils.logger.header(`Packaging for ${command.platforms.join(', ')}`)
  var chain = Promise.resolve()

  command.platforms.forEach(platform => {
    switch (platform) {
      case 'ios':
        chain = chain.then(() => ios(command.optimize))
        break
      case 'android':
        chain = chain.then(() => android(command.optimize))
        break
      case 'web':
        chain = chain.then(() => web(command.optimize))
        break
      case 'desktop':
        chain = chain.then(() => desktop(command.optimize))
        break
    }
  })

  chain.then(() => {
    coreutils.logger.footer(`Successfully packaged`)
  }).catch(e => {
    coreutils.logger.error(e)
  })
}

module.exports = function (command) {
  try {
    parseCommand(command)
  } catch (error) {
    coreutils.logger.error(error)
  }
}
