import config from '../../../chunky.json'
import * as appChunks from '../../../chunks'
import strings from '../../../assets/strings.json'
// import * as providers from '../../../providers'

config.chunks = appChunks
config.id = config.id || "chunky"
config.strings = strings
// config.providers = providers

export default config
