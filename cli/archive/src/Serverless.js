const OriginalServerless = require('serverless')
const CLI = require('./ServerlessCLI')

class Serverless extends OriginalServerless {

  init({ commands, options }) {

    // create a new CLI instance
    this.cli = new CLI(this);

    // get an array of commands and options that should be processed
    this.processedInput = this.cli.processInput({ commands, options });

    // set the options and commands which were processed by the CLI
    this.pluginManager.setCliOptions(this.processedInput.options);
    this.pluginManager.setCliCommands(this.processedInput.commands);

    return this.service.load(this.processedInput.options)
      .then(() => this.pluginManager.loadConfigFile())
      .then(() => {
        // load all plugins
        this.pluginManager.loadAllPlugins(this.service.plugins);

        // give the CLI the plugins and commands so that it can print out
        // information such as options when the user enters --help
        this.cli.setLoadedPlugins(this.pluginManager.getPlugins());
        this.cli.setLoadedCommands(this.pluginManager.getCommands());
        return this.pluginManager.updateAutocompleteCacheFile();
      })
  }
    
}

module.exports = Serverless