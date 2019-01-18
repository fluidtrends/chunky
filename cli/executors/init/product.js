const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const cache = require('../../src/cache')
const cpy = require('cpy')
const download = require('image-downloader')
const merge = require('deepmerge')
const operation = require('../carmel/operation')

function hasFile (filepath) {
  return fs.existsSync(path.resolve(process.cwd(), filepath))
}

function isAlreadyInit () {
  return hasFile("chunky.json")
}

function createFile (filepath, data, json) {
  const file = path.resolve(process.cwd(), filepath)
  if (fs.existsSync(file)) {
    return
  }

  const content = (json ? JSON.stringify(data, null, 2) : data)
  fs.writeFileSync(file, content, 'utf8')
}

function generateChunks(template) {
  const dir = process.cwd()

  coreutils.logger.info(`Generating product chunks ...`)

  const chunksExportsHeader = '// AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY.'
  const chunksExports = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}'`).join('\n')
  const chunksExportsWeb = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.web'`).join('\n')
  const chunksExportsDesktop = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.desktop'`).join('\n')

  fs.writeFileSync(path.resolve(dir, "chunks", 'index.js'), `${chunksExportsHeader}\n\n${chunksExports}`)
  fs.writeFileSync(path.resolve(dir, "chunks", 'index.web.js'), `${chunksExportsHeader}\n\n${chunksExportsWeb}`)
  fs.writeFileSync(path.resolve(dir, "chunks", 'index.desktop.js'), `${chunksExportsHeader}\n\n${chunksExportsDesktop}`)

  coreutils.logger.ok(`Generated chunks indexes`)

  const chunkIndex = (platform) => `import config from "./chunk.json"\nimport * as screens from "./screens/index${platform||""}"\nconst chunk = { screens, ...config }\nexport default chunk`

  Object.keys(template.chunks).map(chunkName => {
    const source = path.resolve(template.bundlePath, "chunks", chunkName)
    const target = path.resolve(dir, "chunks", chunkName)
    fs.copySync(source, target)

    fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.js"), `${chunksExportsHeader}\n\n${chunkIndex()}`)
    fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.web.js"), `${chunksExportsHeader}\n\n${chunkIndex(".web")}`)
    fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.desktop.js"), `${chunksExportsHeader}\n\n${chunkIndex(".desktop")}`)

    try {
      // Override the template chunk manifest
      const targetManifestFile = path.resolve(dir, "chunks", chunkName, "chunk.json")
      var targetManifest = JSON.parse(fs.readFileSync(targetManifestFile, 'utf-8'))
      targetManifest = merge(targetManifest, template.chunks[chunkName])
      console.log(template.chunks[chunkName])
      fs.writeFileSync(targetManifestFile, JSON.stringify(targetManifest, null, 2))
    } catch (e) {
      console.log(e)
      // this should not happen, but just in case
    }

    coreutils.logger.ok(`Added chunk ${chunkName}, including chunk indexes`)
  })
}

function generateAssets(c, template) {
  const dir = process.cwd()
    var remoteAssets = []

    coreutils.logger.info(`Generating local product assets ...`)

    Object.keys(template.assets).map(asset => {
      const target = template.assets[asset]
      if (target === 'local') {
        fs.copySync(path.resolve(template.bundlePath, 'assets', asset), path.resolve(dir, 'assets', asset))
        coreutils.logger.ok(asset)
        return
      }

      remoteAssets.push({ url: target, dest: path.resolve(dir, 'assets', asset) })
    })

    coreutils.logger.info(`Generating remote product assets ...`)
    return Promise.all(remoteAssets.map(a => download.image(a)))
                  .then(() => coreutils.logger.ok(`Downloaded ${remoteAssets.length} remote assets`))
}

function createFiles (c, template) {
  const dir = process.cwd()

  coreutils.logger.info(`Generating product files ...`)

  // Generate the basic structure
  fs.mkdirsSync(path.resolve(dir, ".chunky", "web"))
  fs.mkdirsSync(path.resolve(dir, "node_modules"))
  fs.mkdirsSync(path.resolve(dir, "web"))
  fs.mkdirsSync(path.resolve(dir, "chunks"))
  fs.mkdirsSync(path.resolve(dir, "assets", "text"))

  // Generate hidden file
  createFile(".gitignore", "node_modules\n.DS_Store\n")

  // Generate the main json files
  createFile("package.json", template.package, true)
  createFile("chunky.json", template.manifest, true)
  createFile("web/index.json", template.web, true)
  createFile("web/firebase-config.json", Object.assign({}, template.firebase), true)
  createFile("assets/strings.json", Object.assign({}, template.strings), true)

  coreutils.logger.ok(`package.json`)
  coreutils.logger.ok(`chunky.json`)
  coreutils.logger.ok(`web/index.json`)
  coreutils.logger.ok(`web/firebase-config.json`)
  coreutils.logger.ok(`assets/strings.json`)

  // Create the chunks and the indexes
  generateChunks(template)

  // Add the assets in
  return generateAssets(c, template)
}

function create({ name, template, bundle }, account, mainCache) {
  if (isAlreadyInit()) {
    coreutils.logger.skip("Easy there, this is a Chunky Product already.")
    return
  }

  const c = cache({ log: true, name })
  coreutils.logger.header("Creating your new Chunky Product")

  // Make sure the bundle exists
  c.findRemoteBundle(bundle)

   // The download it if necessary
   .then((uri) => c.downloadBundle(uri))

   // The bundle is now ready to be used so let's get the template
   .then((uri) => c.bundleTemplate(uri, template))

   // Alright, time to generate the files
   .then((data) => createFiles(c, data))

   .then(() => operation.send({ target: "journeys", type: "init", name, template, bundle, pwd: process.cwd() }, account, mainCache))

   .then(() => {
     // All done
     coreutils.logger.footer("Amazing! Your new Chunky Product is ready!")
   })

   // Something went wrong
   .catch((error) => coreutils.logger.error(error.message))
}

module.exports = { create }
