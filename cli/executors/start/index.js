const coreutils = require('coreutils')
const web = require('./web')
const mobile = require('./mobile')
const desktop = require('./desktop')

function parseCommand (command) {
  if (command.platforms.length === 0) {
    command.platforms = ['mobile', 'web', 'desktop']
  }

  command.platforms.forEach(platform => {
    switch (platform) {
      case 'mobile':
        mobile(command.mobilePackagerPort)
        break
      case 'web':
        web(command.webPackagerPort)
        break
      case 'desktop':
        desktop(command.desktopPackagerPort)
        break
    }
  })
}

module.exports = function (command) {
  try {
    parseCommand(command)
  } catch (error) {
    coreutils.logger.error(error)
  }
}
