const coreutils = require('coreutils')
const ios = require('./ios')
const android = require('./android')
const web = require('./web')

function parseCommand(command) {
  if (command.platforms.length === 0) {
    command.platforms = ["ios", "android", "web"]
  }

  command.platforms.forEach(platform => {
    switch(platform) {
        case 'ios':
          ios(command.release)
        break
        case 'android':
          android(command.release)
        break
        case 'web':
          web(command.release, command.webPort)
        break
    }
  })
}

module.exports = function(command) {
  try {
      parseCommand(command)
  } catch (error) {
      coreutils.logger.error(error)
  }
}
