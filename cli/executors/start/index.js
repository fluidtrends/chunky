const coreutils = require('coreutils')
const web = require('./web')
const mobile = require('./mobile')
const desktop = require('./desktop')
const setup = require('../carmel/setup')
const fs = require('fs-extra')
const path = require('path')

function parseCommand (command, account, cache) {
  if (command.platforms.length === 0) {
    command.platforms = ['mobile', 'web', 'desktop']
  }

  const cacheDir = path.resolve(process.cwd(), '.chunky')
  fs.existsSync(cacheDir) || fs.mkdirsSync(cacheDir)

  command.platforms.forEach(platform => {
    switch (platform) {
      case 'mobile':
        mobile(command.mobilePackagerPort, account, cache)
        break
      case 'web':
        web(command.webPackagerPort, account, cache)
        break
      case 'desktop':
        desktop(command.desktopPackagerPort, account, cache)
        break
    }
  })
}

module.exports = function (command) {
  try {
    setup().then(({ account, cache }) => parseCommand(command, account, cache))
  } catch (error) {
    coreutils.logger.error(error)
  }
}
