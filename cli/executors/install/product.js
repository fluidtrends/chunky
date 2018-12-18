const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const { Product, generatePackage, createFile, installTemplate } = require('react-chunky/lib/extended')
const got = require('got')
const generators = require('../../src/generators')

const STORE_ROOT = `https://raw.githubusercontent.com/fluidtrends/chunky/master/store`

function loadStoreIndex () {
  return got(`${STORE_ROOT}/index.json`, { json: true }).then((response) => response.body)
}

  //
  // return new Promise((resolve, reject) => {
  //   try {
  //     // console.log("start")
  //     // console.log("DONE")
  //     // fetch(url)
  //     // .then((response) => response.json())
  //     // .then((json) => {
  //     //   console.log(json)
  //     // })
  //     // const id = name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
  //     // var fixture = this.extensions.fixtures[template.fixture]
  //     // const product = new Product({ name, id, template, fixture, root: CARMEL_ROOT, home: CARMEL_HOME })
  //     //
  //     // if (product.exists) {
  //     //   return Promise.reject(new Error('The product already exists'))
  //     // }
  //     //
  //     // fs.mkdirsSync(product.dir)
  //     //
  //     // const packageData = generatePackage({ name })
  //     // createFile({ root: product.dir, filepath: 'package.json', data: packageData, json: true })
  //     //
  //     // const t = Object.assign({}, template, { name })
  //     // fixture = deepmerge.all([fixture, t, { manifest: { name }}])
  //     //
  //     // installTemplate({ dir: product.dir, home: product.home, template: t, fixture })
  //     //        .then(() => this.downloadProductCover({ product, template }))
  //     //        .then(() => {
  //     //          this.sessionVault.write('productId', id)
  //     //          this.loadProducts()
  //     //          this.mainWindow.webContents.send('refresh', { session: this.data })
  //     //          this.mainWindow.webContents.send(client, { productId: product.id, done: true })
  //     //        })
  //     //        .catch((error) => {
  //     //          this.mainWindow.webContents.send(client, { error })
  //     //        })
  //   } catch (error) {
  //     console.log(error)
  //     // this.mainWindow.webContents.send(client, { error })
  //   }
  // })
// }

function update (name, template, data) {
  // return
  // console.log(data)
  // return Promise.all([generators.generateChunk('intro', 'intro', Object.assign({}, data, { name: 'intro'})),
    // generators.generateChunk('posts', 'posts', Object.assign({}, data, { name: 'posts'})),
    // generators.generateChunk('docs', 'docs', Object.assign({}, data, { name: 'docs'}))])
    //                 .then(() => generators.generateiOS(name, template, data))
    //                 .then(() => generators.generateAndroid(name, template, data))
    //                 .then(() => generators.generateWeb(name, template, data))
    //                 .then(() => generators.generateAssets(name, template, data))
    //                 .then(() => generators.generateCloud(name, template, data))
    //                 .then(() => generators.generateProvisioning(name, template, data))
    //                 .catch(e => coreutils.logger.fail(e.message))
}

function install () {

  return loadStoreIndex()
         .then((index) => {
           console.log(index)
         })

  // const packageFile = path.resolve(process.cwd(), 'package.json')
  // const chunkyFile = path.resolve(process.cwd(), 'chunky.json')
  //
  // if (!fs.existsSync(packageFile) && !fs.existsSync(chunkyFile)) {
  //   coreutils.logger.fail('The product is not initialized yet. Run chunky init first.')
  //   return Promise.resolve()
  // }

  // create()

  // const main = require(packageFile)
  // const chunky = require(chunkyFile)
  // return update(chunky.name, chunky.template, { main, chunky, name: chunky.name, template: chunky.template })
}

module.exports = { install }
