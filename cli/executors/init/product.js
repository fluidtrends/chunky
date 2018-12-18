const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const { Product, generatePackage, createFile, installTemplate } = require('react-chunky/lib/extended')
const got = require('got')
const generators = require('../../src/generators')
const deepmerge = require('deepmerge')

const STORE_ROOT = `https://raw.githubusercontent.com/fluidtrends/chunky/master/store`
const HOME = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
const CARMEL_HOME = path.resolve(HOME, '.carmel')

function loadStoreIndex () {
  return got(`${STORE_ROOT}/index.json`, { json: true }).then((response) => response.body)
}

function loadTemplate (templateId) {
  return got(`${STORE_ROOT}/templates/${templateId}/index.json`, { json: true }).then((response) => response.body)
}

function loadFixture (fixtureId) {
  return got(`${STORE_ROOT}/fixtures/${fixtureId}/index.json`, { json: true }).then((response) => response.body)
}

function installFiles(name, template, fixtureBase) {
    return new Promise((resolve, reject) => {
      try {
        // Parse the main id
        const id = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()

        // Parse the main fixture
        const fixture = deepmerge.all([fixtureBase,  Object.assign({}, template, { name }), { manifest: { name }}])

        // Create everything where we are
        const dir = process.cwd()

        // First, let's create the assets location
        const assetsDir = path.resolve(dir, 'assets')
        const assetsTextDir = path.resolve(assetsDir, 'text')
        fs.mkdirsSync(assetsDir)
        fs.mkdirsSync(assetsTextDir)

        // Let's create the web app location
        const webRoot = path.resolve(dir, 'web')
        const webBuildRoot = path.resolve(dir, '.chunky', 'web')
        fs.mkdirsSync(webRoot)
        fs.mkdirsSync(webBuildRoot)

        // Generate the web info
        createFile({ root: webRoot, filepath: 'index.json', data: fixture.web, json: true })

        // Generate the main manifest file
        createFile({ root: dir, filepath: 'chunky.json', data: fixture.manifest, json: true })

        // Generate the web firebase config - empty for now
        createFile({ root: webRoot, filepath: 'firebase-config.json', data: {}, json: true })

        // Generate the main strings file
        createFile({ root: assetsDir, filepath: 'strings.json', data: fixture.strings || {}, json: true })
        
        // const bundleImages = fixture.images.map(image => path.resolve(template.assetsDir, image))
        // const bundleText = fixture.text.map(t => path.resolve(template.assetsDir, 'text', t))
        //
        // const chunkInstallers = Object.keys(fixture.chunks).map(chunkName => {
        //   const chunk = fixture.chunks[chunkName]
        //   return installChunk({ chunk, chunkName, dir, home, template, fixture })
        // })
        //
        // const copyImages = () => cpy(bundleImages, assetsDir)
        // const copyText = () => cpy(bundleText, assetsTextDir)
        //
        // Promise.all(chunkInstallers)
        //        .then(() => copyImages())
        //        .then(() => copyText())
        //        .then(() => {
        //          updateChunksIndex(dir)
        //
        //          const webRoot = path.resolve(dir, 'web')
        //          const webBuildRoot = path.resolve(dir, '.chunky', 'web')
        //
        //          fs.mkdirsSync(webRoot)
        //          fs.mkdirsSync(webBuildRoot)
        //
        //          createFile({ root: webRoot, filepath: 'index.json', data: fixture.web, json: true })
        //          createFile({ root: webRoot, filepath: 'firebase-config.json', data: {}, json: true })
        //          createFile({ root: dir, filepath: 'chunky.json', data: fixture.manifest, json: true })
        //          createFile({ root: assetsDir, filepath: 'strings.json', data: fixture.strings || {}, json: true })
        //
        //          resolve()
        //        })
        //        .catch(e => {
        //          console.log(e)
        //          reject(e)
        //        })
      } catch (e) {
        console.log(e)
        reject(e)
      }
  })
}

function install(name, templateId, index) {
  return loadTemplate(templateId)
         .then((template) => {
           // Loaded the template - let's look and see if its fixture is ok
           if (!index.fixtures.find(f => f.id === template.fixture)) {
             throw new Error(`Invalid template. The template uses an unknown fixture: ${template.fixture}`)
           }

           // Great, let's go ahead and install the files
           return loadFixture(template.fixture)
                  .then((fixture) => installFiles(name, template, fixture))
         })
}

function create(name, templateId) {
  return loadStoreIndex()
         .then((index) => {
           // Look for the template
           if (!index.templates.find(t => t.id === templateId)) {
             throw new Error(`Unknown template "${templateId}". Specify a known template or leave out the --template argument to use the default template.`)
           }

           // Install the template
           return install(name, templateId, index)
         })
         .catch((error) => {
           coreutils.logger.error(`${error.message}`)
         })
}

module.exports = { create }
