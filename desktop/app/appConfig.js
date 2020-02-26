import config from '__app/chunky.json'
import * as appChunks from '__app/.chunky/chunks/index.desktop.js'
import strings from '__app/assets/strings.json'
import desktop from '__app/desktop/index.json'

config.chunks = appChunks
config.id = config.id || 'chunky'
config.strings = strings
config.platform = 'desktop'
config.desktop = desktop

console.log("*******", config)

export default config
