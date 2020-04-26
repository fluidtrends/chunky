const { Octokit } = require("@octokit/rest")

const savor = require('savor')
const github = savor.src('services/github')

savor

.add('initialize', (context, done) => {
  done()
})

.run('GitHub')
