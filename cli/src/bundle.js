const { Octokit } = require('@octokit/rest')
const path = require('path')
const fs = require('fs-extra')
const lali = require('lali')
const Template = require('./Template')

class _ {
    constructor(props, env) {
        this._props = Object.assign({}, props)
        this._env = env
        const [owner, repo, version] = this.props.id ? this.props.id.split('/') : []
        this._info = { owner, repo, version }
        this._github = new Octokit()
        this._ready = false
    }

    get props () {
        return this._props
    }

    get env () {
        return this._env
    }

    get id () {
        return this.props.id
    }

    get fullId() {
        return `${this.info.owner}/${this.info.repo}/${this.info.version}`
    }

    get archiveUrl() {
        return `https://github.com/${this.info.owner}/${this.info.repo}/archive/${this.info.version}.tar.gz`
    }

    get info() {
        return this._info
    }

    get github() {
        return this._github
    }

    get isCached() {
        return (this.cachedPath && fs.existsSync(this.cachedPath))
    }

    get cachedPath() {
        return this.env && this.fullId ? path.resolve(this.env.dirs.bundles, this.fullId) : false
    }

    get isReady() {
        return this._ready
    }

    initialize() {
        if (this.isReady) {
            return Promise.resolve(this.fullId)
        }

        if (this.env) {
            return this.env.initialize().then(() => this.sync())
        }

        return this.sync()
    }

    sync() {
        return this.checkVersion().then(() => this.download())
    }

    download() {
        if (this.isCached) {
            // No need
            return Promise.resolve()
        }

        // Prepare the bundle cache location
        fs.mkdirsSync(this.cachedPath)
               
        // Attempt to download and decompress the remote archive
        return lali.link(this.archiveUrl).install(this.cachedPath)
                    .catch((error) => {
                        // Clean up the bundle cache location
                        fs.removeSync(this.cachedPath)
                    })
    }

    fixturePath(name) {
        return this.cachedPath ? path.resolve(this.cachedPath, 'fixtures', name, 'index.js') : false
    }

    templatePath(name) {
        return this.cachedPath ? path.resolve(this.cachedPath, 'templates', name, 'index.js') : false
    }

    hasTemplate(name) {
       return this.templatePath(name) ? fs.existsSync(this.templatePath(name)) : false
    }

    hasFixture(name) {
        return this.fixturePath(name) ? fs.existsSync(this.fixturePath(name)) : false
    }

    loadTemplate(name, props = {}) {
        if (!this.hasTemplate(name)) {
            // Let's see if this bundle has the required template
            return
        }

        const template = require(this.templatePath(name))(props)

        if (!this.hasFixture(template.fixture)) {
            // We need the fixture to be present
            return
        }
        
        const fixture = require(this.fixturePath(template.fixture))(props)
        const data = template.data(fixture)
        delete template.data

        return new Template(data, Object.assign({}, data, { bundleUri: this.fullId, bundlePath: this.cachedPath }, template, props))
    }

    generateFromTemplate(name, props) {
        const template = this.loadTemplate(name, props)

        if (!template) {
            return Promise.reject(new Error(_.ERRORS.CANNOT_LOAD_TEMPLATE()))
        }

        return template.generate()
    }

    checkVersion() {
        if (!this.id) {
            return Promise.reject(new Error(_.ERRORS.CANNOT_CHECK('the bundle id is missing')))
        }

        if (!this.info.repo) {
            return Promise.reject(new Error(_.ERRORS.CANNOT_CHECK('the bundle repo is missing')))
        }

        if (this.info.version) {
            // Checking the specific version
            return this.github.repos.getReleaseByTag({ owner: this.info.owner, repo: this.info.repo, tag: this.info.version })
                                .then(() => {
                                    this._ready = true
                                })
        }

        // Check for the latest version
        return this.github.repos.getLatestRelease({ owner: this.info.owner, repo: this.info.repo })
                      .then((release) => {
                         this._info.version = release.data.tag_name
                         this._ready = true
                      })
    }
}

_.ERRORS = {
    CANNOT_CHECK: (reason) => reason ? `Cannot check the latest version because ${reason}` : `Cannot check the latest version`,
    CANNOT_LOAD_TEMPLATE: (reason) => reason ? `Cannot load template because ${reason}` : `Cannot load template`
}

module.exports = _