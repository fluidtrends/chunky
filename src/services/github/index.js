const { Octokit } = require("@octokit/rest")
const moment = require('moment')

const MILESTONE_FIELDS = ["number", "title", "id", "open_issues", "closed_issues", "state", "due_on", "closed_at", "description"]
const ISSUE_FIELDS = ["number", "title", "id", "open_issues", "labels", "body", "state", "due_on", "closed_at"]
const IDS = { milestone: "number", assignee: "login" }

const _cleanFields = (data, fields) => data.map(item => Object.keys(item).map(k => !fields.includes(k) && delete item[k]) && item)
const milestones = async (repo) => _._.issues.listMilestonesForRepo({ owner: repo.split('/')[0], repo: repo.split('/')[1] })
                                              .then(({ data }) => _cleanFields(data, MILESTONE_FIELDS))
const issues = async ({ repo, milestone }) => _._.issues.listForRepo({ owner: repo.split('/')[0], repo: repo.split('/')[1], milestone })
                                              .then(({ data }) => _cleanFields(data, ISSUE_FIELDS))

const init = async () => new Promise((resolve, reject) => {
    if (!process.env.CHUNKY_GITHUB_PERSONAL_TOKEN) {
        throw new Error('Missing Chunky GitHub token')
    }

    _._ = new Octokit({ auth: process.env.CHUNKY_GITHUB_PERSONAL_TOKEN })
    resolve()
})

const _ = {
    init, milestones, issues
}

module.exports = _
