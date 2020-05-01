const Release = require('./Release')

class _ {
    constructor(props, services) {
        this._props = props
        this._services = services
    }

    get services() {
        return this._services
    }

    get props() {
        return this._props
    }

    get id() {
        return this.props.id 
    }

    get repo() {
        return this.props.repo 
    }

    get name() {
        return this.props.name
    }

    get dashboard() {
        return this._dashboard
    }
    
    get releases() {
        return this._releases
    }

    get milestones() {
        return this._milestones
    }

    get currentRelease() {
        return this._currentRelease
    }

    async load() {
        this._dashboard = this.services.google.sheet(this.props.spreadsheetId)
        this._milestones = await this.services.github.milestones(this.repo)

        this._releases = await this.dashboard.rows(`Roadmap!A3:J103`)
        this._releases = this.releases.map(([id, name, status]) => {
            const milestone = this.milestones.find(m => `${m.number}` === id)
            return milestone && new Release({ id, name, status, milestone }, this)
        })

        this._currentRelease = await this._releases.find(r => r.isCurrent).load()
    }
}

module.exports = _