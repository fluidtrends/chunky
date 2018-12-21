const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const cache = require('../../src/cache')
const generators = require('../../src/generators')
const cpy = require('cpy')

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

  const chunksExportsHeader = '// AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY.'
  const chunksExports = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}'`).join('\n')
  const chunksExportsWeb = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.web'`).join('\n')
  const chunksExportsDesktop = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.desktop'`).join('\n')

  fs.writeFileSync(path.resolve(dir, "chunks", 'index.js'), `${chunksExportsHeader}\n\n${chunksExports}`)
  fs.writeFileSync(path.resolve(dir, "chunks", 'index.web.js'), `${chunksExportsHeader}\n\n${chunksExportsWeb}`)
  fs.writeFileSync(path.resolve(dir, "chunks", 'index.desktop.js'), `${chunksExportsHeader}\n\n${chunksExportsDesktop}`)

  const chunkIndex = (platform) => `import config from "./chunk.json"\nimport * as screens from "./screens/index${platform||""}"\nconst chunk = { screens, ...config }\nexport default chunk`

  Object.keys(template.chunks).map(chunkName => {
    const source = path.resolve(template.bundlePath, "chunks", chunkName)
    const target = path.resolve(dir, "chunks", chunkName)
    fs.copySync(source, target)

    fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.js"), `${chunksExportsHeader}\n\n${chunkIndex()}`)
    fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.web.js"), `${chunksExportsHeader}\n\n${chunkIndex(".web")}`)
    fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.desktop.js"), `${chunksExportsHeader}\n\n${chunkIndex(".desktop")}`)
  })
}

function createFiles (c, template) {
  const dir = process.cwd()

  // Generate the basic structure
  fs.mkdirsSync(path.resolve(dir, ".chunky", "web"))
  fs.mkdirsSync(path.resolve(dir, "node_modules"))
  fs.mkdirsSync(path.resolve(dir, "web"))
  fs.mkdirsSync(path.resolve(dir, "chunks"))
  fs.mkdirsSync(path.resolve(dir, "assets", "text"))

  // Generate the main json files
  createFile("package.json", template.package, true)
  createFile("chunky.json", template.manifest, true)
  createFile("web/index.json", template.web, true)
  createFile("web/firebase-config.json", Object.assign({}, template.firebase), true)
  createFile("assets/strings.json", Object.assign({}, template.strings), true)

  // Create the chunks and the indexes
  generateChunks(template)
}

function create({ name, template, bundle }) {
  if (isAlreadyInit()) {
    coreutils.logger.skip("Easy there, this is a Chunky Product already.")
    return
  }

  const c = cache({ log: true, name })
  coreutils.logger.info("Creating your new Chunky Product ...")

  // Make sure the bundle exists
  c.findRemoteBundle(bundle)

   // The download it if necessary
   .then((uri) => c.downloadBundle(uri))

   // The bundle is now ready to be used so let's get the template
   .then((uri) => c.bundleTemplate(uri, template))

   // Alright, time to generate the files
   .then((data) => createFiles(c, data))

   // Use the dependencies
   .then(() => c.addDeps())

   .then(() => {
     // All done
     coreutils.logger.ok("Amazing! Your new Chunky Product is ready!")
     coreutils.logger.info("Wanna see it in action? Type this: chunky start web")
   })

   // Something went wrong
   .catch((error) => coreutils.logger.error(error.message))
}

module.exports = { create }
