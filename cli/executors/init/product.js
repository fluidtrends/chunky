const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')

const generators = require('../../src/generators')

function create(name, template) {
  const packageFile = path.resolve(process.cwd(), 'package.json')
  const chunkyFile = path.resolve(process.cwd(), 'chunky.json')

  if (fs.existsSync(packageFile) &&
      fs.existsSync(chunkyFile)) {
        coreutils.logger.skip("Skipping initialization. The product is already initialized.")
        return Promise.resolve()
  }

  return generators.generateProductManifestFiles(name, template)
}

module.exports = { create }
