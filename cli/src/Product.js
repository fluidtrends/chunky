const path = require('path')
const fs = require('fs-extra')

class _ {
    constructor(props, env) {
        this._props = Object.assign({}, props)
        this._env = env
    }

    get props () {
        return this._props
    }

    get env () {
        return this._env
    }

    createFile (filepath, data) {
        const file = path.resolve(process.cwd(), filepath)

        if (fs.existsSync(file)) {
            return false
        }

        const content = (path.extname(filepath).toLocaleUpperCase() === '.JSON' ? JSON.stringify(data, null, 2) : data)
        fs.writeFileSync(file, content, 'utf8')
     
        return fs.existsSync(file)
    }   

    generateFiles(template) {
        if (!template.files) {
            return Promise.reject(new Error(_.ERRORS.CANNOT_GENERATE('there are no files to be generated')))
        }

        return new Promise((resolve, reject) => {
            _.DIRS.map(dir => fs.existsSync(dir) || fs.mkdirsSync(dir))
            var files = []

            Object.keys(template.files).map(filepath => {
                if (!template.data[template.files[filepath]]) {
                    return
                }

                this.createFile(filepath, template.data[template.files[filepath]]) && files.push(filepath)
            })

            resolve(files)
        })        
    }

    // addChunks() {
    //     const dir = process.cwd()
        
    //     // console.log(this.props.chunks)

    //     return new Promise((resolve, reject) => {
          
    //     //   Object.keys(template.chunks).map(chunk =>
    //     //   const chunk = new Chunk()

    //     //   const chunksExportsHeader = '// AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY.'
    //     //   const chunksExports = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}'`).join('\n')
    //     //   const chunksExportsWeb = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.web'`).join('\n')
    //     //   const chunksExportsDesktop = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.desktop'`).join('\n')
    //       resolve()
    //     })

    //     //   const chunksExportsHeader = '// AUTO-GENERATED FILE. PLEASE DO NOT MODIFY. CHUNKY WILL CRY.'
    //     //   const chunksExports = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}'`).join('\n')
    //     //   const chunksExportsWeb = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.web'`).join('\n')
    //     //   const chunksExportsDesktop = Object.keys(template.chunks).map(chunk => `export { default as ${chunk} } from './${chunk}/index.desktop'`).join('\n')
        
    //     //   fs.writeFileSync(path.resolve(dir, "chunks", 'index.js'), `${chunksExportsHeader}\n\n${chunksExports}`)
    //     //   fs.writeFileSync(path.resolve(dir, "chunks", 'index.web.js'), `${chunksExportsHeader}\n\n${chunksExportsWeb}`)
    //     //   fs.writeFileSync(path.resolve(dir, "chunks", 'index.desktop.js'), `${chunksExportsHeader}\n\n${chunksExportsDesktop}`)
        
    //     //   coreutils.logger.ok(`Generated chunks indexes`)
        
    //     //   const chunkIndex = (platform) => `import config from "./chunk.json"\nimport * as screens from "./screens/index${platform||""}"\nconst chunk = { screens, ...config }\nexport default chunk`
        
    //     //   Object.keys(template.chunks).map(chunkName => {
    //     //     const source = path.resolve(template.bundlePath, "chunks", chunkName)
    //     //     const target = path.resolve(dir, "chunks", chunkName)
    //     //     fs.copySync(source, target)
        
    //     //     fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.js"), `${chunksExportsHeader}\n\n${chunkIndex()}`)
    //     //     fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.web.js"), `${chunksExportsHeader}\n\n${chunkIndex(".web")}`)
    //     //     fs.writeFileSync(path.resolve(dir, "chunks", chunkName, "index.desktop.js"), `${chunksExportsHeader}\n\n${chunkIndex(".desktop")}`)
        
    //     //     try {
    //     //       // Override the template chunk manifest
    //     //       const targetManifestFile = path.resolve(dir, "chunks", chunkName, "chunk.json")
    //     //       var targetManifest = JSON.parse(fs.readFileSync(targetManifestFile, 'utf-8'))
    //     //       targetManifest = merge(targetManifest, template.chunks[chunkName])
    //     //       fs.writeFileSync(targetManifestFile, JSON.stringify(targetManifest, null, 2))
    //     //     } catch (e) {
    //     //       console.log(e)
    //     //       // this should not happen, but just in case
    //     //     }
    // }

    // generateAssets() {
    //     const dir = process.cwd()
    //     const assetsDir = path.resolve(dir, 'assets')
        
    //     var remoteAssets = []

    //     fs.existsSync(assetsDir) || fs.mkdirsSync(assetsDir)

    //     Object.keys(this.props.assets).map(asset => {
    //         const target = this.props.assets[asset]

    //         if (target === 'local') {
    //             fs.copySync(path.resolve(this.props.bundlePath, 'assets', asset), path.resolve(dir, 'assets', asset))
    //             return
    //         }

    //         remoteAssets.push({ url: target, dest: path.resolve(dir, 'assets', asset) })
    //     })

    //     return Promise.all(remoteAssets.map((asset) => download.image(asset)))
    // }

    // generate() {
    //     return Promise.all([this.generateFiles(), this.addChunks(), this.generateAssets()])
    // }

    generate(props) {
      // Let's create the appropriate bundle
    //   const bundle = new Bundle({ id: props.bundle }, this.env)

    //   // First let's ensure the bundle is ready for usage
    //   return bundle.initialize()
    //                .then(() => bundle.loadTemplate(props))
    //                .then((template) => this.generateFiles(template))
        return Promise.resolve()
    }
}

_.DIRS = [".chunky/web", "node_modules", "web", "chunks", "assets/text"]

_.ERRORS = {
    CANNOT_GENERATE: (reason) => reason ? `Cannot generate the product because ${reason}` : `Cannot generate the product`
}

module.exports = _