const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const got = require('got')
const cpy = require('cpy')
const deepmerge = require('deepmerge')
const lali = require('lali')
const octokit = require('@octokit/rest')()

const HOME_DIR = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
const CHUNKY_HOME_DIR = path.resolve(HOME_DIR, '.chunky')
const CHUNKY_REPO_URL = `https://raw.githubusercontent.com/fluidtrends/chunky/master`

const _dir = (props) => CHUNKY_HOME_DIR
const _bundlesDir = (props) => path.resolve(_dir(props), 'bundles')
const _depsDir = (props) => path.resolve(_dir(props), 'deps')
const _exists = (props) => fs.existsSync(_dir(props))
const _bundlePath = (props) => (uri) => path.resolve(_bundlesDir(props), uri)
const _bundleExists = (props) => (uri) => fs.existsSync(_bundlePath(props)(uri))

const _create = (props) => {
  if (_exists(props)) {
    // No need to create it again
    return
  }

  // Create the cache structure
  fs.mkdirsSync(_dir(props))
  fs.mkdirsSync(_bundlesDir(props))
  fs.mkdirsSync(_depsDir(props))
}

const _bundleFixture = (props) => (bundleUri, fixtureId) => {
  if (!_bundleExists(props)(bundleUri)) {
    throw new Error(`The ${bundleUri} bundle is not cached`)
  }

  const fixturePath = _bundlePath(props)(`${bundleUri}/fixtures/${fixtureId}`)
  if (!fs.existsSync(fixturePath)) {
    throw new Error(`The ${bundleUri} bundle does not include the ${fixtureId} fixture`)
  }

  return require(fixturePath)(props)
}

const _bundleTemplate = (props) => (bundleUri, templateId) => {
  return new Promise((resolve, reject) => {

    _info(props)(`Looking for the ${templateId} template inside the bundle ...`)

    if (!_bundleExists(props)(bundleUri)) {
      throw new Error(`The ${bundleUri} bundle is not cached`)
    }

    const templatePath = _bundlePath(props)(`${bundleUri}/templates/${templateId}`)
    if (!fs.existsSync(templatePath)) {
      throw new Error(`The ${bundleUri} bundle does not include the ${templateId} template`)
    }

    const template = require(templatePath)(props)
    const fixture = _bundleFixture(props)(bundleUri, template.fixture)
    const bundlePath = _bundlePath(props)(bundleUri)
    const data = template.data(fixture)

    _ok(props)(`Using the ${templateId} template from the ${bundleUri} bundle`)
    resolve(Object.assign({}, data, { bundleUri, bundlePath }))
  })
}

const _bundlePackage = (props) => (uri) => {
  if (!_bundleExists(props)(uri)) {
    throw new Error(`The ${uri} bundle is not cached`)
  }

  return require(path.resolve(_bundlePath(props)(uri), 'package.json'))
}

const _bundleInfo = (props) => (uri) => {
  const parts = uri.split("/")
  if (parts.length < 3) {
    throw new Error("Invalid bundle identifier")
  }

  return { username: parts[0], repo: parts[1], version: parts[2] }
}

const _ok = (props) => (message) => coreutils.logger.ok(message)
const _info = (props) => (message) => coreutils.logger.info(message)
const _skip = (props) => (message) => coreutils.logger.skip(message)
const _error = (props) => (message) => coreutils.logger.error(message)

const _findRemoteBundle = (props) => (uri) => {
    const [owner, repo, version] = uri.split("/")

    _info(props)(`Looking for bundle ${owner}/${repo} ...`)
    
    if (version) {
      return octokit.repos.getReleaseByTag({ owner, repo, tag: `v${version}` })
                    .then((release) => {
                      _ok(props)(`Found remote bundle ${owner}/${repo} (v${version})`)
                      return `${owner}/${repo}/${version}`
                    })
    }

    return octokit.repos.getLatestRelease({ owner, repo })
                  .then((release) => {
                    const v = release.data.tag_name.substring(1)
                    _ok(props)(`Found latest remote bundle ${owner}/${repo} (v${v})`)
                    return `${owner}/${repo}/${v}`
                  })
}

const _downloadBundle = (props) => (uri) => {
  return new Promise((resolve, reject) => {
    if (_bundleExists(props)(uri)) {
      // No need to download if it already exists
      _ok(props)(`Using cached ${uri} bundle`)
      resolve(uri)
      return
    }

    if (!_exists(props)){
      // Initialize the cache if this is the first time using it
      _create(props)
      _ok(props)(`Initialized the global cache`)
    }

    const cachedPath = _bundlePath(props)(uri)
    const info = _bundleInfo(props)(uri)

    _info(props)(`Downloading the remote bundle ...`)

    // Look up the bundle archive
    const link = `https://github.com/${info.username}/${info.repo}/archive/v${info.version}.tar.gz`

    // Prepare the bundle cache location
    fs.mkdirsSync(cachedPath)

    // Attempt to download the bundle
    lali.link(link).install(cachedPath)
        .then((data) => {
          _ok(props)(`The ${uri} bundle archive was successfully cached`)
          resolve(uri)
        })
        .catch((error) => {
          // Clean up the bundle cache location
          _error(props)(`The remote ${uri} bundle archive does exist`)
          fs.removeSync(cachedPath)
        })
   })
}

const _downloadDeps = (props) => (type) => {
  return new Promise((resolve, reject) => {

    if (!_exists(props)){
      // Initialize the cache if this is the first time using it
      _create(props)
      _ok(props)(`Initialized the global cache`)
    }

   const dir = _depsDir(props)
   const cachedPath = path.resolve(dir, type)

   if (fs.existsSync(cachedPath)) {
     _ok(props)(`Using cached ${type} dependencies`)
     resolve()
     return
   }

   // Prepare the deps cache location
   fs.mkdirsSync(cachedPath)

   _ok(props)(`Found remote ${type} dependencies. Downloading archive ...`)

   // Look up the deps archive
   const link = (part) => `https://raw.githubusercontent.com/fluidtrends/chunky-deps/master/${type}/${part}.tar.gz`

   // Attempt to download the bundle
   Promise.all([lali.link(link(0)).install(cachedPath),
                 lali.link(link(1)).install(cachedPath),
                 lali.link(link(2)).install(cachedPath)])
        .then((data) => {
          _ok(props)(`The ${type} dependencies are now successfully cached`)
          resolve()
        })
        .catch((error) => {
          // Clean up the bundle cache location
          _error(props)(`The ${type} dependencies archive does not exist`)
          fs.removeSync(cachedPath)
        })
   })
}

const _addDeps = (props) => () => {
  _info(props)(`Adding dependencies ...`)

  return Promise.all([_downloadDeps(props)("web")])
                .then(() => {
                  _ok(props)(`The cached web dependencies are ready. Copying ...`)
                  fs.copySync(path.resolve(_depsDir(props), 'web'), path.resolve(process.cwd(), "node_modules"))
                  _ok(props)(`The local web dependencies are ready`)
                })
}

module.exports = (props) => ({
  dir: _dir(props),
  bundlesDir: _bundlesDir(props),
  depsDir: _depsDir(props),
  exists: _exists(props),
  bundlePath: _bundlePath(props),
  bundleExists: _bundleExists(props),
  bundlePackage: _bundlePackage(props),
  bundleTemplate: _bundleTemplate(props),
  bundleFixture: _bundleFixture(props),
  findRemoteBundle: _findRemoteBundle(props),
  create: _create(props),
  bundleInfo: _bundleInfo(props),
  downloadBundle: _downloadBundle(props),
  downloadDeps: _downloadDeps(props),
  addDeps: _addDeps(props)
})
