const { Octokit } = require("@octokit/rest")
const moment = require('moment')

const MILESTONE_FIELDS = ["number", "title", "id", "open_issues", "closed_issues", "state", "due_on", "closed_at", "description"]
const ISSUE_FIELDS = ["number", "title", "id", "open_issues", "labels", "body", "state", "due_on", "closed_at", "pull_request"]
const PULL_FIELDS = [["head", ["label", "ref", "sha", ["repo", ["full_name"]], ["user", ["login"]]]], ["user", ["login"]], ["milestone", ["number"]], "labels", "created_at", "updated_at", "closed_at", "body", "merged_at", "merge_commit_sha", "title", "state", "number", "id"]
const EVENT_FIELDS = ["id", ["milestone", ["number"] ], ["issue", ["number", "state", "labels", ["milestone", ["number"]]]], ["actor", ["login"]], "event", "commit_id", "created_at"]

const _clean = (item, fields) => {
    var result = {}

    fields.map(field => {
        if (typeof field !== "string" && item[field[0]]) {
            result[field[0]] = _clean(item[field[0]], field[1])
            return
        } 

        if (!item[field]) {
            return
        }

        result[field] = item[field]
    })

    return result
}

const milestones = async (repo) => _._.issues.listMilestonesForRepo({ owner: repo.split('/')[0], repo: repo.split('/')[1] })
                                              .then(({ data }) => data.map(item => _clean(item, MILESTONE_FIELDS)))

const issues = async ({ repo, milestone, pageSize, page, buffer }) => (!page || page === 0) ? (buffer || []) : 
        _._.issues.listForRepo({ owner: repo.split('/')[0], repo: repo.split('/')[1], milestone, state: "all", per_page: (pageSize || 100), page })
                .then(({ data }) => data.map(item => _clean(item, ISSUE_FIELDS)))
                .then((data) => issues({ repo, milestone, pageSize, page: (page-1), buffer: (buffer || []).concat(data) }))

const pulls = async ({ repo, milestone }) => _._.pulls.list({ owner: repo.split('/')[0], repo: repo.split('/')[1], state: "all", sort: "created", direction: "desc", per_page: 100 })
                                                      .then(({ data }) => data.filter(d => d.milestone && `${d.milestone.number}` === `${milestone}`))
                                                      .then((data) => data.map(item => _clean(item, PULL_FIELDS)))
const events = async ({ repo, milestone }) => _._.issues.listEventsForRepo({ owner: repo.split('/')[0], repo: repo.split('/')[1], per_page: 100 })
                                                      .then(({ data }) => data)
                                                      .then((data) => data.map(item => _clean(item, EVENT_FIELDS)))

const init = async () => new Promise((resolve, reject) => {
    if (!process.env.CHUNKY_GITHUB_PERSONAL_TOKEN) {
        throw new Error('Missing Chunky GitHub token')
    }

    _._ = new Octokit({ auth: process.env.CHUNKY_GITHUB_PERSONAL_TOKEN })
    resolve()
})

const _ = {
    init, milestones, issues, pulls, events
}

module.exports = _
