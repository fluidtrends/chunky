const coreutils = require('coreutils')
const status = require('../../status')
const operation = require('../../operation')
const input = require('../../input')
const inquirer = require('inquirer')
const got = require('got')

const TYPES = ['web', 'api', 'challenge']

function ensureVaultIsUnlocked(cache) {
  if (cache.vaults.master.isLocked) {
    coreutils.logger.info(`Looks like your Carmel vault is locked. Let's unlock it first`)
    return utils.unlock(cache)
  }

  return Promise.resolve()
}

function doPublish(acc, cache, env, options, type) {
  return new Promise((resolve, reject) => {
    try {
      require(`./${type}`)(acc, cache, env, options)
          .then((data) => resolve(data))
          .catch((error) => reject(error))
    } catch (e) {
      require(`./web`)(acc, cache, env, options)
          .then((data) => resolve(data))
          .catch((error) => reject(error))
    }
  })
}

function publish(acc, cache, env, options, t) {
  if (!t || !TYPES.includes(t)) {
    return inquirer.prompt([{
      type: 'list',
      choices: TYPES,
      default: "web",
      name: 'type',
      message: "What do you want to publish?"
    }])
    .then(({ type }) => doPublish(acc, cache, env, options, type))
  }

  return doPublish(acc, cache, env, options, t)
}

function processCommand(account, cache, args, env, options) {
  return ensureVaultIsUnlocked(cache)
          .then(() => {
            if (!args || args.length === 0) {
              return publish(account, cache, env, options)
            }

            // The type we want
            const type = args.shift()
            return publish(account, cache, env, options, type)
          })
}

function main(account, cache, args, env, options) {
  if (!account) {
    return status(account, cache).then(() => {
      try {
        const a = cache.vaults.carmel.read('account')
        return processCommand(a, cache, args, env, options)
      } catch (e) {
        coreutils.logger.info(`Hey so how about you try this again :)`)
        return
      }
    })
  }

  return processCommand(account, cache, args, env, options)
}

module.exports = main
