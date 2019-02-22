const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')

module.exports = function (providers, deployment) {
  coreutils.logger.info('Deploying web ...')

  //   // Prepare the raw path
  // const assetsPath = path.resolve(deployment.dir, 'assets')
  // if (!fs.existsSync(assetsPath)) {
  //   fs.mkdirsSync(assetsPath)
  // }

  return Promise.resolve()
           .then(() => coreutils.logger.done())
}
