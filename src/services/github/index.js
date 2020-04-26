const { Octokit } = require("@octokit/rest")
const moment = require('moment')

const MILESTONE_FIELDS = ["number", "title", "id", "open_issues", "closed_issues", "state", "due_on", "closed_at", "description"]
const _cleanFields = (data, fields) => data.map(item => Object.keys(item).map(k => !fields.includes(k) && delete item[k]) && item)

const milestones = async (props) => _._.issues.listMilestonesForRepo({ owner: props.owner, repo: props.repo })
                                              .then(({ data }) => _cleanFields(data, MILESTONE_FIELDS))

const init = async () => new Promise((resolve, reject) => {
    if (!process.env.CHUNKY_GITHUB_PERSONAL_TOKEN) {
        throw new Error('Missing Chunky GitHub token')
    }

    _._ = new Octokit({ auth: process.env.CHUNKY_GITHUB_PERSONAL_TOKEN })
    resolve()
})

const _ = {
    init, milestones
}

module.exports = _
