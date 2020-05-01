EFFORT_SIZES = { XS: 1, S: 2, M: 3, L: 5, XL: 8 }

class _ {
    constructor(props, product) {
        this._props = props
        this._product = product
    }

    get id() {
        return this.props.id
    }

    get name() {
        return this.props.name
    }

    get status() {
        return this.props.status
    }

    get isCurrent() {
        return this.status.toLowerCase() === 'current'
    }

    get product() {
        return this._product
    }

    get props() {
        return this._props
    }

    get milestone() {
        return this.props.milestone
    }

    get issues() {
        return this._issues
    }

    get effort() {
        return this._effort
    }

    get flows() {
        return this._flows
    }

    async load() {
        const milestone = this.milestone.number
        this._issues = await this.product.services.github.issues({ repo: this.product.repo, milestone })

        this._effort = {}

        this.issues.map(issue => {
            const found = issue.title.match(/^([A-Z][0-9]+)\s*:\s*(.*)$/)
            var weight = 0
            issue.labels.map(label => weight = EFFORT_SIZES[label.name] || weight)

            if (!found) {
                return
            }

            const flow = found[1].trim()

            this.effort[flow] = this.effort[flow] || { weight: 0, issues: 0 }
            this.effort[flow].weight = this.effort[flow].weight + weight
            this.effort[flow].issues = this.effort[flow].issues + 1
        })

        this._flows = await this.product.dashboard.rows(`${this.name}!A6:ZZ106`)
        
        return this
    }

    async sync() {
        var startRow = 6
        var endRow = startRow + this.flows.length

        var updates = this.flows.map(([id,,,effort]) => {            
            const isStep = id.match(/^([A-Z][0-9]+)$/) ? true : false
            const eff = this.effort[id] ? this.effort[id].weight : (effort || 0) || 0
            return isStep ? [eff] : []
        })

        this.product.dashboard.update(`${this.name}!D${startRow}:D${endRow}`, updates)
    }

    generateReport () {
        return Object.assign({}, {
            release: {
                name: this.name,
                id: this.id, 
                effort: this.effort
            }
        })
    }
}

module.exports = _