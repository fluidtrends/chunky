const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const got = require('got')
const cpy = require('cpy')
const deepmerge = require('deepmerge')
const lali = require('lali')
const { Octokit } = require('@octokit/rest')()
const cassi = require('cassi')
const download = require('download')
const decompress = require('decompress')
const decompressTarbz2 = require('decompress-tarbz2')
const decompressTargz = require('decompress-targz')
const uuid = require('uuid')
const Base64 = require('js-base64').Base64

const CHUNKY_REPO_URL = `https://raw.githubusercontent.com/fluidtrends/chunky/master`
const CHUNKY_STORE_URL = `https://github.com/fluidtrends/chunky-store/raw/master`

const HOME_DIR = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
const CHUNKY_HOME_DIR = path.resolve(HOME_DIR, '.chunky')

const CARMEL_VAULT_PASSWORD = `_chunky_carmel_`
const MASTER_VAULT_PASSWORD = `_chunky_master_`
const EVENTS_VAULT_PASSWORD = `_chunky_events_`
// const MAX_CACHED_EVENTS = 100

const _dir = (props) => CHUNKY_HOME_DIR
const _bundlesDir = (props) => path.resolve(_dir(props), 'bundles')
const _toolsDir = (props) => path.resolve(_dir(props), 'bin')
const _vaultsDir = (props) => path.resolve(_dir(props), 'vaults')
const _eventsDir = (props) => path.resolve(_dir(props), 'events')
const _challengesDir = (props) => path.resolve(_dir(props), 'challenges')
const _exists = (props) => fs.existsSync(_vaultsDir(props))
const _bundlePath = (props) => (uri) => path.resolve(_bundlesDir(props), uri)
const _bundleExists = (props) => (uri) => fs.existsSync(_bundlePath(props)(uri))

const _carmelVault = new cassi.Vault({ name: 'carmel', root: _vaultsDir() })
const _masterVault = new cassi.Vault({ name: 'master', root: _vaultsDir() })
const _eventsVault = new cassi.Vault({ name: 'events', root: _vaultsDir() })

const _create = (props) => {
  if (_exists(props)) {
    // No need to create it again
    return
  }

  // Create the cache structure
  fs.mkdirsSync(_dir(props))
  fs.mkdirsSync(_bundlesDir(props))
  fs.mkdirsSync(_vaultsDir(props))
  fs.mkdirsSync(_toolsDir(props))
  fs.mkdirsSync(_challengesDir(props))
  fs.mkdirsSync(_eventsDir(props))

  // Create the vaults
  _carmelVault.create(CARMEL_VAULT_PASSWORD)
  _masterVault.create(MASTER_VAULT_PASSWORD)
  _eventsVault.create(EVENTS_VAULT_PASSWORD)
}

const _addDeps = (props) => (env) => {
  _info(props)(`Adding dependencies ...`)

  const dest = path.resolve(process.cwd(), "node_modules")
  fs.existsSync(dest) || fs.mkdirsSync(dest)

  const src = path.resolve(_dir(props), 'env', env.latest.version, 'node_modules')
 
  return new Promise((resolve, reject) => {
    env.latest.dependencies.map(dep => {
      fs.copySync(path.resolve(src, dep), path.resolve(dest, dep))
    })
    resolve()
  })
}

// const _bundleFixture = (props) => (bundleUri, fixtureId) => {
//   if (!_bundleExists(props)(bundleUri)) {
//     throw new Error(`The ${bundleUri} bundle is not cached`)
//   }

//   const fixturePath = _bundlePath(props)(`${bundleUri}/fixtures/${fixtureId}`)
//   if (!fs.existsSync(fixturePath)) {
//     throw new Error(`The ${bundleUri} bundle does not include the ${fixtureId} fixture`)
//   }

//   return require(fixturePath)(props)
// }

// const _bundleTemplate = (props) => (bundleUri, templateId) => {
//   return new Promise((resolve, reject) => {

//     _info(props)(`Looking for the ${templateId} template inside the bundle ...`)

//     if (!_bundleExists(props)(bundleUri)) {
//       throw new Error(`The ${bundleUri} bundle is not cached`)
//     }

//     const templatePath = _bundlePath(props)(`${bundleUri}/templates/${templateId}`)
//     if (!fs.existsSync(templatePath)) {
//       throw new Error(`The ${bundleUri} bundle does not include the ${templateId} template`)
//     }

//     const template = require(templatePath)(props)
//     const fixture = _bundleFixture(props)(bundleUri, template.fixture)
//     const bundlePath = _bundlePath(props)(bundleUri)
//     const data = template.data(fixture)

//     _ok(props)(`Using the ${templateId} template from the ${bundleUri} bundle`)
//     resolve(Object.assign({}, data, { bundleUri, bundlePath }))
//   })
// }

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

// const _findRemoteBundle = (props) => (uri) => {
//     const [owner, repo, version] = uri.split("/")

//     _info(props)(`Looking for bundle ${owner}/${repo} ...`)

//     if (version) {
//       return Octokit.repos.getReleaseByTag({ owner, repo, tag: `${version}` })
//                     .then((release) => {
//                       _ok(props)(`Found remote bundle ${owner}/${repo} (${version})`)
//                       return `${owner}/${repo}/${version}`
//                     })
//     }

//     return Octokit.repos.getLatestRelease({ owner, repo })
//                   .then((release) => {
//                     const v = release.data.tag_name.substring(0)
//                     _ok(props)(`Found latest remote bundle ${owner}/${repo} (${v})`)
//                     return `${owner}/${repo}/${v}`
//                   })
// }

// const _downloadBundle = (props) => (uri) => {
//   return new Promise((resolve, reject) => {
//     if (_bundleExists(props)(uri)) {
//       // No need to download if it already exists
//       _ok(props)(`Using cached ${uri} bundle`)
//       resolve(uri)
//       return
//     }

//     if (!_exists(props)){
//       // Initialize the cache if this is the first time using it
//       _create(props)
//       _ok(props)(`Initialized the global cache`)
//     }

//     const cachedPath = _bundlePath(props)(uri)
//     const info = _bundleInfo(props)(uri)

//     _info(props)(`Downloading the remote bundle ...`)

//     // Look up the bundle archive
//     const link = `https://github.com/${info.username}/${info.repo}/archive/${info.version}.tar.gz`

//     // Prepare the bundle cache location
//     fs.mkdirsSync(cachedPath)

//     // Attempt to download the bundle
//     lali.link(link).install(cachedPath)
//         .then((data) => {
//           _ok(props)(`The ${uri} bundle archive was successfully cached`)
//           resolve(uri)
//         })
//         .catch((error) => {
//           // Clean up the bundle cache location
//           _error(props)(`The remote ${uri} bundle archive does exist`)
//           fs.removeSync(cachedPath)
//         })
//    })
// }

// const _downloadDeps = (props) => (type) => {
//   return new Promise((resolve, reject) => {

//     if (!_exists(props)){
//       // Initialize the cache if this is the first time using it
//       _create(props)
//       _ok(props)(`Initialized the global cache`)
//     }

//    const dir = _depsDir(props)
//    const cachedPath = path.resolve(dir, type)

//    if (fs.existsSync(cachedPath)) {
//      _ok(props)(`Using cached ${type} dependencies`)
//      resolve()
//      return
//    }

//    // Prepare the deps cache location
//    fs.mkdirsSync(cachedPath)

//    _ok(props)(`Found remote ${type} dependencies. Downloading archive ...`)

//    // Look up the deps archive
//    const link = (part) => `https://raw.githubusercontent.com/fluidtrends/chunky-deps/master/${type}/${part}.tar.gz`

//    // Attempt to download the bundle
//    Promise.all([lali.link(link(0)).install(cachedPath),
//                  lali.link(link(1)).install(cachedPath),
//                  lali.link(link(2)).install(cachedPath)])
//         .then((data) => {
//           _ok(props)(`The ${type} dependencies are now successfully cached`)
//           resolve()
//         })
//         .catch((error) => {
//           // Clean up the bundle cache location
//           _error(props)(`The ${type} dependencies archive does not exist`)
//           fs.removeSync(cachedPath)
//         })
//    })
// }

// const _addDeps = (props) => () => {
//   _info(props)(`Adding dependencies ...`)

//   const dest = path.resolve(process.cwd(), "node_modules")
//   fs.existsSync(dest) && fs.removeSync(dest)
//   console.log(dest)
  
//   const archivePath = path.resolve(_depsDir(props), `main.tar.gz`)

//   // return decompress(archivePath, dest, { strip: 0, plugins: [decompressTarbz2()]})
//   return decompress(archivePath, dest, { strip: 0, plugins: [decompressTargz()]})
//                   .then(() => {
//                       _ok(props)(`The local web dependencies are ready`)
//                   })
// }

// const _saveEvent = (props) => (event) => {
//   const id = `${Date.now()}-${uuid.v4()}`
//   const file = path.resolve(_eventsDir(props), `${id}.json`)
//   const content = Base64.encode(JSON.stringify(event))
//   fs.writeFileSync(file, content)

//   let events = _eventsVault.read('events') || []

//   if (events.length >= MAX_CACHED_EVENTS) {
//     const oldId = events.shift()
//     fs.removeSync(path.resolve(_eventsDir(props), `${oldId}.json`))
//   }

//   events.push(id)
//   _eventsVault.write('events', events) || []

//   return id
// }

const _event = (props) => (id) => {
  const file = path.resolve(_eventsDir(props), `${id}.json`)
  const event = JSON.parse(Base64.decode(fs.readFileSync(file)))

  return event
}
 
const _getChallenge = (props) => ({ repo, sha, fragment }) => {
  return new Promise((resolve, reject) => {
    if (!_exists(props)){
      // Initialize the cache if this is the first time using it
      _create(props)
      _ok(props)(`Initialized the global cache`)
    }

   const dir = _challengesDir(props)
   const cachedPath = path.resolve(dir, repo, sha, fragment)

   if (fs.existsSync(cachedPath)) {
     try {
       const challenge = JSON.parse(fs.readFileSync(path.resolve(cachedPath, 'index.json'), 'utf8'))
       resolve(Object.assign({}, challenge, { dir: cachedPath }))
       return
     } catch (e) {
       reject(new Error("The challenge manifest is invalid"))
       return
     }
   }

   // Prepare the deps cache location
   fs.mkdirsSync(cachedPath)

   const baseUrl = `https://raw.githubusercontent.com/${repo}/${sha}/${fragment}`
   const url = `${baseUrl}/index.json`

   got.head(url)
      .then((ok) => download(url, cachedPath))
      .then(() => {
        try {
          const challenge = JSON.parse(fs.readFileSync(path.resolve(cachedPath, 'index.json'), 'utf8'))
          const totalTasks = challenge.tasks.length
          var downloads = [`${baseUrl}/init.js`]

          for(var i = 0; i < totalTasks; i++) {
            downloads.push(`${baseUrl}/${i}.tutorial.md`)
            downloads.push(`${baseUrl}/${i}.validate.js`)
          }

          Promise.all(downloads.map(f => download(f, cachedPath)))
                 .then(() => {
                   resolve(Object.assign({}, challenge, { dir: cachedPath }))
                 })
        } catch (e) {
          reject(new Error("The challenge manifest is invalid"))
          return
        }
      })
      .catch((err) => {
        reject(new Error("The challenge repository is missing"))
      })
  })
}

const _setup = (props) => () => {
  const platform = "mac"
  const now = Date.now()

  if (!_exists(props)){
    // Initialize the cache if this is the first time using it
    _create(props)
  }

  return Promise.all([
      _carmelVault.load(),
      _masterVault.load(),
      _eventsVault.load()
  ])  
}

const _vaults = (props) => ({
  carmel: _carmelVault,
  master: _masterVault,
  events: _eventsVault
})

module.exports = (props) => {
  return {
    dir: _dir(props),
    toolsDir: _toolsDir(props),
    bundlesDir: _bundlesDir(props),
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
    getChallenge: _getChallenge(props),
    setup: _setup(props),
    saveEvent: _saveEvent(props),
    event: _event(props),
    addDeps: _addDeps(props),
    vaults: _vaults(props)
  }
  
}
