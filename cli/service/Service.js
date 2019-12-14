const express = require('express')
const io = require("socket.io")
const http = require("http")
const { spawn } = require('child_process')
const path = require('path')
const fs = require('fs-extra')
const setup = require('../executors/carmel/setup')

class Service {
    constructor(options) {
        this._options = Object.assign({}, options)
        this._app = express()
        this._server = http.Server(this._app)
        this._io = io(this._server)
    }

    get options () {
        return this._options || {}
    }

    get account() {
        return this._account
    }

    get cache() {
        return this._cache
    }

    sendResponse({ event, socket }) {
        socket.emit("event", Object.assign({}, 
            event
        ))
    }

    processEvent({ event, socket }) {
        const cwd = path.resolve(this.cache.dir, 'env', event.env.latest.version, 'products', event.options.productId || '')

        fs.existsSync(cwd) || fs.mkdirsSync(cwd)

        const runner = path.resolve(__dirname, 'run.js')
        process.env.PATH = `${this.cache.toolsDir}/node/${this.options.nodeVersion}/bin/:${process.env.PATH}`

        const chunky = JSON.stringify({ cwd, event })

        return new Promise((resolve, reject) => {
            process.env.chunky = chunky
            const proc = spawn('node', [`${runner}`], { cwd, stdio: ['inherit', 'inherit', 'inherit', 'ipc'] })
            // const proc = spawn('node', [`${runner}`], { cwd, stdio: ['ignore', 'ignore', 'ignore', 'ipc'] })
            
            proc.on('error', (error) => {
                console.log(error)
            })

            proc.on('message', (id) => {
                const response = this.cache.event(id)
                this.sendResponse({ event: Object.assign({}, event, response), socket })
            })

            resolve(proc)
        })
    }

    start() {
        setup().then(({ account, cache }) => {
            this._account = account 
            this._cache = cache 

            this._io.on("connection", (socket) => {
                socket.on("event", (event) => {
                    this.processEvent({ event, socket })
                })
            })
    
            this._server.listen(this.options.port, () => {
                console.log("Chunky service started on port " + this.options.port)
            })    
        })
    }
}

module.exports = Service