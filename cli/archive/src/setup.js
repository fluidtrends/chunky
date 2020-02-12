// const coreutils = require('coreutils')
// const firebase = require('firebase')
// const fs = require('fs-extra')
// const path = require('path')
const cache = require('./cache')

// const HOME_DIR = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']

function setup() {
  const _cache = cache({})

  return _cache.setup().then((account) => ({ account, cache: _cache }))
}

module.exports = setup
