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

    exec(session) {
      return Promise.all([super.exec(session), this.load(session)])
                    .then(([script, props]) => script(props))
   }
}

_.ERRORS = Object.assign({}, _.ERRORS, {})

module.exports = _
