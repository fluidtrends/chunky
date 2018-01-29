const coreutils = require('coreutils')
const web = require("./web")
const mobile = require("./mobile")

function parseCommand(command) {
    if (command.platforms.length == 0) {
        command.platforms = ["mobile", "web"]
    }

    command.platforms.forEach(platform => {
        switch(platform) {
            case 'mobile':
                mobile(command.mobilePackagerPort)
            break;
            case 'web':
                web(command.webPackagerPort)
            break;
        }
    })
}

module.exports = function(command) {
    try {
        parseCommand(command)
    } catch (error) {
        coreutils.logger.error(error)
    }
}
