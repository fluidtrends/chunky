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

    get state() {
        return this._state
    }

    async load() {
        const milestone = this.milestone.number
        const pageSize = 100
        const page = Math.ceil((this.milestone.open_issues + this.milestone.closed_issues) / pageSize)
        this._issues = await this.product.services.github.issues({ repo: this.product.repo, milestone, page, pageSize })

        const allPullRequests = this.issues.filter(i => i.pull_request)
        const allIssues = this.issues.filter(i => !i.pull_request)
        const openPullRequests = this.issues.filter(i => i.pull_request && i.state === "open")
        const closedPullRequests = this.issues.filter(i => i.pull_request && i.state === "closed")
        const openIssues = this.issues.filter(i => !i.pull_request && i.state === "open")
        const closedIssues = this.issues.filter(i => !i.pull_request && i.state === "closed")
        
        this._state = {
            allPullRequests, allIssues, openPullRequests, closedPullRequests, openIssues, closedIssues
        }

        this._effort = {} 

        allIssues.map(issue => {
            const found = issue.title.match(/^([A-Z][0-9]+)\s*:\s*(.*)$/)
            var weight = 0
            issue.labels.map(label => weight = EFFORT_SIZES[label.name] || weight)

            if (!found) {
                return
            }

            const flow = found[1].trim()


            this.effort[flow] = this.effort[flow] || { required: 0, invested: 0, issues: 0 }
            this.effort[flow].issues = this.effort[flow].issues + 1
            this.effort[flow].required = this.effort[flow].required + weight
            this.effort[flow].invested = this.effort[flow].invested + (issue.state === "closed" ? weight : 0)
        })

        this._flows = await this.product.dashboard.rows(`${this.name}!A6:ZZ106`)
        
        return this
    }

    async sync() {
        var startRow = 6
        var endRow = startRow + this.flows.length

        var updates = this.flows.map(([id,,,effort]) => {            
            if (!id.match(/^([A-Z][0-9]+)$/) || !this.effort[id]) {
                return []
            }
            
            return [this.effort[id].required, this.effort[id].invested]
        })

        this.product.dashboard.update(`${this.name}!D${startRow}:E${endRow}`, updates)
    }

    generateReport () {
        return Object.assign({}, {
            release: {
                name: this.name,
                id: this.id, 
                effort: this.effort,
                allPullRequests: this.state.allPullRequests.length,
                allIssues: this.state.allIssues.length,
                openPullRequests: this.state.openPullRequests.length,
                closedPullRequests: this.state.closedPullRequests.length,
                openIssues: this.state.openIssues.length,
                closedIssues: this.state.closedIssues.length
            }
        })
    }
}

module.exports = _