const coreutils = require('coreutils')
const fs = require('fs-extra')
const path = require('path')
const Carmel = require('@carmel/sdk')

class _ extends Carmel.Commands.Start {
    constructor(args) {
      super(args)
    }

    load(session) {
      var props = {
        dir: process.cwd(),
        port: "8082"
      } 
  
      return session.workspace.loadFile('chunky.json')
                    .then((config) => { 
                      props.config = Object.assign({}, config) 
                      return session.workspace.findDirs('chunks')
                    })
                    .then((dirs) => Promise.all(dirs.map(dir => session.workspace.loadFile(`chunks/${dir}/chunk.json`))))
                    .then((chunks) => { 
                      props.chunks = [].concat(chunks)
                      return props
                    })
    }

    run({ session, script, props }) {
      // Start with a fresh locations
      const chunksDir = path.resolve(session.workspace.dir, '.chunky', 'chunks')
      const webDir = path.resolve(session.workspace.dir, '.chunky', 'web')
 
      fs.existsSync(webDir) && fs.removeSync(webDir)
      fs.existsSync(chunksDir) && fs.removeSync(chunksDir)

      fs.mkdirsSync(chunksDir)
      fs.mkdirsSync(webDir)

      const indexWebFile = path.resolve(chunksDir, 'index.web.js')
      var indexWeb = ""

      props.chunks.map(chunk => {
        const chunkDir = path.resolve(chunksDir, chunk.name)
        const indexWebChunkFile = path.resolve(chunkDir, 'index.web.js')
        const indexWebChunk = `${_.INDEX_WEB_CHUNK(chunk)}`

        const chunkScreensDir = path.resolve(chunkDir, 'screens')
        const indexWebChunkScreensFile = path.resolve(chunkScreensDir, 'index.web.js')
        const indexWebChunkScreens = Object.keys(chunk.routes).map(screen => _.INDEX_WEB_CHUNK_SCREEN(chunk, screen)).join('\n')

        indexWeb = `${indexWeb}\n${_.INDEX_WEB(chunk)}`
        
        fs.mkdirsSync(chunkScreensDir)
        fs.writeFileSync(indexWebChunkFile, indexWebChunk, 'utf8')
        fs.writeFileSync(indexWebChunkScreensFile, indexWebChunkScreens, 'utf8')
      })

      fs.writeFileSync(indexWebFile, indexWeb, 'utf8')

      return script(props)
    }

    exec(session) {
      return Promise.all([super.exec(session), this.load(session)])
                    .then(([script, props]) => this.run({ session, script, props }))
   }
}

_.ERRORS = Object.assign({}, _.ERRORS, {})

_.INDEX_WEB_CHUNK_SCREEN = (chunk, screen) => `export { default as ${screen} } from '../../../../chunks/${chunk.name}/screens/${screen}.web'`
_.INDEX_WEB = (chunk) => `export { default as ${chunk.name} } from './${chunk.name}/index.web.js'`
_.INDEX_WEB_CHUNK = (chunk) => `
import config from '../../../chunks/${chunk.name}/chunk.json'
import * as screens from './screens/index.web.js'
const chunk = { screens, ...config }
export default chunk
`

module.exports = _
