const coreutils = require('coreutils')

module.exports = (command, args) => {
    const cmd = new command({ env: args.env })
    coreutils.logger.header(`${cmd.title}`)

    cmd.run(args).then(() => {
        // The execution was success
        coreutils.logger.footer(`Wow, amazing! You're good to go!`)
    })

    .catch((error) => {
        // Something went wrong
        coreutils.logger.error(`Error: ${error.message}`)
    })
}