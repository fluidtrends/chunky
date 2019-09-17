const Serverless = require('../../../../src/Serverless')
const coreutils = require('coreutils')
const path = require('path')
const fs = require('fs-extra')
const loaders = require('../../../../src/loaders')
const generators = require('../../../../src/generators')
const cpy = require('cpy')
const utils = require('../../utils')

function prepareService(service, deployment) {
    if (!fs.existsSync(service.dir)) {
        fs.mkdirsSync(service.dir)
    }

    // Get a manifest and package
    const manifest = generators.generateServerlessManifest(service, deployment)
    const package = generators.generateServerlessPackage(service, deployment)

    // Generate the manifest
    fs.writeFileSync(path.resolve(service.dir, "serverless.json"),
                     JSON.stringify(manifest, null, 2))

    // Generate the package
    fs.writeFileSync(path.resolve(service.dir, "package.json"),
                     JSON.stringify(package, null, 2))

    // Figure out the chunk location
    const productDir = path.resolve(process.cwd())
    const chunkDir = path.resolve(productDir, 'chunks', service.name)

    // Copy the chunk function and the chunk manifest over, along with global assets
    return cpy([
        chunkDir + '/functions/*',
        chunkDir + "/chunk.json",
        productDir + "/.chunky.json",
        productDir + "/chunky.json"
    ], service.dir)
}

function installServiceDependencies(service, deployment) {
    return (deployment.remove ? Promise.resolve : coreutils.run.npmInstall(service.dir))
}

function deployService(service, deployment) {
    const serverless = new Serverless({
        interactive: false,
        servicePath: service.dir
    })

    const cwd = service.dir
    let spinner = ''

    coreutils.logger.info(`${deployment.remove ? 'Removing' : 'Deploying'} ${service.name} service (${service.functions.length} functions)...`)
    return prepareService(service, deployment).
           then(() => {
            spinner = utils.startProgress('Installing dependencies ...')
            utils.startConsoleCapture()
            return installServiceDependencies(service, deployment)
           }).
           then(() => {
            utils.stopConsoleCapture()
            spinner.succeed()
            spinner = utils.startProgress('Preparing serverless functions ...')
            return serverless.init({ commands: [deployment.remove ? 'remove' : 'deploy'], options: { cwd, env: deployment.env }})
           }).
           then(() => {
            spinner.succeed()
            spinner = utils.startProgress('Deploying service to cloud ...')
            return serverless.run()
           }).
           then(() => {
            spinner.succeed()
           })
}

function batchServices(services, deployment) {
    // Prepare the raw path
    const servicesDir = path.resolve(deployment.dir, 'services')
    if (!fs.existsSync(servicesDir)) {
        fs.mkdirsSync(servicesDir)
    }

    return Promise.all(Object.keys(services).map(serviceName => {
        var service = services[serviceName]
        service.name = serviceName
        service.dir = path.resolve(servicesDir, serviceName)

        return deployService(service, deployment)
    }))
}

module.exports = function(providers, deployment) {
    return loaders.loadFunctions(providers, deployment.chunks)
            .then(functions => {
                if (!functions || Object.keys(functions).length === 0) {
                    coreutils.logger.skip("Skipping - no functions to be deployed")
                    return Promise.resolve().
                        then(() => coreutils.logger.done())
                }

                var services = {}
                functions.forEach(f => {
                    services[f.chunk] = services[f.chunk] || {}
                    services[f.chunk].dependencies = Object.assign({}, services[f.chunk].dependencies || {}, f.dependencies)
                    services[f.chunk].functions = services[f.chunk].functions || []
                    services[f.chunk].functions.push(f)
                })

                return batchServices(services, deployment)
            })
}
