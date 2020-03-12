const Carmel = require('@carmel/sdk')
const run = require('./run')
const path = require('path')

class _ extends Carmel.Commands.Start {
    constructor(args) {
      super(args)
      this._platform = _.PLATFORMS[args.platform ? args.platform.toUpperCase() : _.DEFAULT_PLATFORM.toUpperCase()]
    }

    get platform() {
      return this._platform
    }

    get target() {
      return this.platform
    }

    makeConfig(session) {
      const papanacheVersion = session.get('papanacheVersion')
      const chunkyWeb = path.resolve(process.cwd(), 'node_modules', 'react-dom-chunky')
      const assetsGlob = `${path.resolve(chunkyWeb, 'app', 'assets')}/**/**`
      const root = path.resolve(session.index.path, 'archives', 'papanache', papanacheVersion, 'papanache')

      return {
        dir: process.cwd(),
        port: 8082,
        name: "chunky",
        assetsGlob,
        startScript: {
          dev: path.resolve(chunkyWeb, 'app', 'index.dev.js')
        },
        page: {
          dev: path.resolve(chunkyWeb, 'app', 'pages', 'default.html')
        },
        root
      } 
    }

    load(session) {
      const props = this.makeConfig(session)

      return session.workspace.loadFile('chunky.json')
                    .then((config) => { 
                      props.config = Object.assign({}, config) 
                      return session.workspace.findDirs('chunks')
                    })
                    .then((dirs) => Promise.all(dirs.map(dir => session.workspace.loadFile(`chunks/${dir}/chunk.json`))))
                    .then((chunks) => { 
                      props.sections = [].concat(chunks)
                      return props
                    })
    }

    exec(session) {
      return Promise.all([super.exec(session), this.load(session)])
                    .then(([script, props]) => run({ session, script, props }))
   }
}

_.ERRORS = Object.assign({}, _.ERRORS, {
})

_.PLATFORMS = { WEB: "web", DESKTOP: "desktop", MOBILE: "mobile" }
_.DEFAULT_PLATFORM = _.PLATFORMS.WEB

module.exports = _
