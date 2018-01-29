const coreutils = require('coreutils')
const browserSync = require('browser-sync')
const path = require('path')
const open = require('open')

module.exports = function(release, port) {
  if (!release) {
    coreutils.logger.info(`Running the Web app in development mode on port ${port} ...`)
    open(`http://localhost:${port}`)
    return
  }

  coreutils.logger.info(`Running the packaged Web app on port ${port} ...`)

  const webDir = path.resolve(process.cwd(), 'web', 'build')
  const bs = browserSync.create()

  bs.init({
    port,
    server: webDir
  })
}
