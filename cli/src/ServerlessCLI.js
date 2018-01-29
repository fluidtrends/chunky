const chalk = require('chalk')

const OriginalServerlessCLI = require('serverless/lib/classes/CLI')

class ServerlessCLI extends OriginalServerlessCLI {
    
  processInput({ commands, options }) {
    return { commands, options }
  }

  log(message) {
    this.consoleLog(`  ↳ ${chalk.gray(`${message}`)}`);
  }

}

module.exports = ServerlessCLI