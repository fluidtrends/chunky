const operation = require('../../operation')
const utils = require('../../utils')

module.exports = (account, cache, challenge, state) => {
  const events = cache.vaults.carmel.read('events')
  // const signature = utils.encrypt(account, cache, Object.assign({}, state, events && { events }))
  const signature = utils.encode(account, cache, Object.assign({}, state, events && { events }))
  
  return operation.send(Object.assign({}, {
    target: "journeys",
    type: "next",
    skills: challenge.content.skills,
    totalTasks: challenge.state.totalTasks,
    signature,
  }), account, cache)
}
