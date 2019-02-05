const utils = require('../../utils')

const find = (account, cache) => {
  return utils.getChallenge(account, cache)
          .then((challenge) => {
            if (!challenge || !challenge._id) {
              throw new Error(`Try starting a challenge first :)`)
            }

            if (!challenge.status || challenge.status !== "published") {
              throw new Error(`This challenge is unpublished, give us some time to audit first.`)
            }

            return challenge
          })
}

const check = (challenge) => {
  if (!challenge || !challenge.content || !challenge.content.tasks || challenge.content.tasks.length == 0) {
    return Promise.reject(new Error("Looks like this challenge does not have any tasks"))
  }

  const totalTasks = challenge.content.tasks.length
  const taskIndex = parseInt(challenge.state.taskIndex)

  if (isNaN(taskIndex)) {
    return Promise.reject(new Error("Looks like this challenge does not have a valid task index"))
  }

  if (taskIndex >= totalTasks) {
    return Promise.reject(new Error("Looks like this challenge is completed"))
  }

  challenge.state.totalTasks = totalTasks
  challenge.state.taskIndex = taskIndex

  return Promise.resolve(challenge)
}

module.exports = ({ account, cache }) => {
  return new Promise((resolve, reject) => {
    return find(account, cache).then((challenge) => {
      return cache.getChallenge({
        repo: challenge.repo,
        sha: challenge.hash,
        fragment: challenge.path
      })
      .then((content) => Object.assign({}, challenge, { content }))
    })
    .then((challenge) => check(challenge))
    .then((challenge) => resolve(challenge))
    .catch((error) => {
      reject(error)
    })
  })
}
