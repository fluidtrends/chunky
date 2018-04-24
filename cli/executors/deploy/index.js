const coreutils = require('coreutils')
const loaders = require('../../src/loaders')
const providers = require('../../src/providers')
const assets = require('./assets')
const functions = require('./functions')
const path = require('path')
const fs = require('fs-extra')

function initialize (providers, command) {
    // Prepare the deploy path
  const id = coreutils.string.uuid()
  const date = new Date()
  const timestamp = date.getTime()
  const apiDomain = providers.aws.options.apiDomain
  const apiVersion = providers.aws.options.apiVersion
  const apiName = providers.aws.options.apiName
  const apiKeyId = providers.aws.options.apiKeyId
  const apiKeySecret = providers.aws.options.apiKeySecret

  const deployPath = path.resolve(process.cwd(), '.chunky', 'deployments', id)
  if (!fs.existsSync(deployPath)) {
    fs.mkdirsSync(deployPath)
  }

    // Create a fingerprint
  const fingerprint = {
    id,
    date,
    timestamp,
    apiName,
    apiDomain,
    apiVersion,
    apiKeyId,
    remove: command.remove,
    env: command.env,
    chunks: command.chunks.filter(c => c)
  }
  fs.writeFileSync(path.resolve(deployPath, 'fingerprint.json'), JSON.stringify(fingerprint, null, 2))

  return Object.assign({ dir: deployPath, apiKeySecret }, fingerprint)
}

function deployChain (providers, index, deployment) {
    // If we want to deploy the assets, let's do that first
  var chain = (index.assets ? assets(providers, deployment) : Promise.resolve())

    // If we've got functions to deploy, let's do that next
  return (index.functions ? chain.then(() => functions(providers, deployment)) : chain)
}

function parseCommand (command) {
  var config = loaders.loadSecureConfig()

  if (!config || !config.cloud[command.env]) {
    throw new Error(`Invalid secure cloud configuration or invalid cloud environment ${command.env}`)
  }

    // The environment-specific configuration
  config = config.cloud[command.env]

    // First, find the artifacts we care about
  if (command.artifacts.length == 0) {
    command.artifacts = ['assets', 'functions']
  }
  var artifacts = command.artifacts.filter(artifact => (artifact === 'assets' || artifact === 'functions'))
  if (!artifacts || artifacts.length === 0) {
    coreutils.logger.skip(`Skipping - no valid artifacts requested`)
    process.exit(0)
  }

  coreutils.logger.header(`Starting new deployment to the ${command.env} cloud environment`)

  providers.authenticate(config)

    .then(providers => {
      // Setup a new deployment
      const deployment = initialize(providers, command)

      var index = {}
      command.artifacts.forEach(artifact => (index[artifact] = true))

      return deployChain(providers, index, deployment)
    })

    .then(() => {
      coreutils.logger.footer(`The ${command.env} cloud environment is now ready`)
      process.exit(0)
    })

    .catch(e => {
      coreutils.logger.error(e)
      process.exit(1)
    })
}

module.exports = function (command) {
  try {
    parseCommand(command)
  } catch (error) {
    coreutils.logger.error(error)
  }
}
