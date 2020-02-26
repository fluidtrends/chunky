import config from 'chunky.json'
import * as appChunks from '.chunky/chunks/index.desktop.js'
import strings from 'assets/strings.json'
import desktop from 'desktop/index.json'

config.chunks = appChunks
config.id = config.id || 'chunky'
config.strings = strings
config.platform = 'desktop'
config.desktop = desktop

export default config
