const coreutils = require('coreutils')
const path = require('path')
const loaders = require('../../src/loaders')
const recursive = require('recursive-readdir')
const uuid = require('uuid/v4')
const hasha = require('hasha')
const fs = require('fs-extra')

const IGNORES = ['.DS_Store', '*.LICENSE']

function generateFingerprint({ chunks, config }) {
  return new Promise((resolve, reject) => {

    var fingerprint = Object.assign({}, {
      id: uuid(),
      timestamp: `${Date.now()}`,
      files: {}
    },
    config.name && { name: config.name },
    config.domain && { domain: config.domain })

    const dir = path.resolve(process.cwd(), '.chunky', 'web')

    recursive(dir, IGNORES, (err, files) => {
      if (err || !files || files.length === 0) {
        resolve(fingerprint)
        return
      }

      files.map(file => {
        const f = path.relative(dir, file)
        fingerprint.files[f] = {
          hash: hasha.fromFileSync(file, { algorithm: 'md5' })
        }

        coreutils.logger.ok(`${f}`)
      })

      resolve(fingerprint)
    })
  })
}

module.exports = function(optimize) {
    coreutils.logger.info(`Packaging your Web app. Hang tight, this could take a minute or two ...`)

    const file = path.resolve(process.cwd(), 'node_modules', 'react-dom-chunky', 'bin', 'build')
    const build = require(file)
    const config = loaders.loadMainConfig()
    const chunks = loaders.loadChunkConfigs()

    var secure = {}
    try {
      secure = loaders.loadSecureConfig()
    } catch (e) {
    }

    const fingerprintFile = path.resolve(process.cwd(), '.chunky', 'web', 'chunky.json')
    var oldFingerprint
    try {
      oldFingerprint = JSON.parse(fs.readFileSync(fingerprintFile, 'utf8'))
    } catch (e) {
    }

    return generateFingerprint({ config, chunks })
          .then((fingerprint) => {
            return build({ dir: process.cwd(), config, secure, chunks }).then(() => {
              const fingerprintData = JSON.stringify(Object.assign({}, fingerprint), null, 2)
              fs.writeFileSync(path.resolve(process.cwd(), '.chunky', 'web', 'chunky.json'), fingerprintData)
              coreutils.logger.ok(`Your Web app is now packaged`)
            }).catch(e => {
              coreutils.logger.fail(e)
            })
          })

}
