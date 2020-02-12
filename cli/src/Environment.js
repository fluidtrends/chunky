const uuid = require('uuid')
const path = require('path')
const fs = require('fs-extra')
const Base64 = require('js-base64').Base64
const Cassi = require('cassi')

class _ {
    constructor(props) {
        this._props = Object.assign({}, props)
        this._homeDir = this.props.homeDir || _.DEFAULT_HOME_DIR 
        this._dirs = {}        
        _.DIRS.map(dir => this._dirs[dir] = path.resolve(this.homeDir, dir))

        this._vaults = {
            events: new Cassi.Vault({ name: 'cache', root: this.dirs.events })
        }    
    }

    get props () {
        return this._props
    }

    get vaults() {
        return this._vaults
    }

    get dirs () {
        return this._dirs
    }

    get homeDir () {
        return this._homeDir
    }

    initialize() {
        if (this.isReady) {
            // Not necessary
            return Promise.resolve()
        }

        // Create directories if necessary
        _.DIRS.map(dir => fs.existsSync(this.dirs[dir]) || fs.mkdirsSync(this.dirs[dir]))

        // Create the vaults if necessary
        Object.keys(this.vaults).map(id => {
            this.vaults[id].exists || this.vaults[id].create(_.VAULT_DEFAULT_PASSWORD)
        })
        
        if (!this.isReady) {
            // Something went wrong
            return Promise.reject(new Error(_.ERRORS.NOT_READY()))
        }

        return new Promise((resolve, reject) => {
            resolve()
        })
    }

    get isReady() {
        // Make sure all required directories exist
        return _.DIRS.filter(dir => !fs.existsSync(this.dirs[dir])).length === 0 &&

               // Let's also make sure all the vaults are created
              Object.keys(this.vaults).filter(id => !this.vaults[id].exists).length === 0
    }
}

_.USER_HOME_DIR = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME']
_.DEFAULT_HOME_DIR = path.resolve(_.USER_HOME_DIR, '.chunky')
_.DIRS = ['events', 'bundles']
_.LIMITS = { MAX_EVENTS: 100 }
_.VAULT_DEFAULT_PASSWORD = 'chunky'

_.ERRORS = {
    NOT_READY: (reason) => reason ? `The environment is not ready because [${reason}]` : `The environment is not ready`
}

module.exports = _