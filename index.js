import * as Core       from './src/core'
import * as Data       from './src/data'
import * as Errors     from './src/errors'
import * as Styles     from './src/styles'
import * as Utils      from './src/utils'
import * as Config     from './src/config'
import merge           from 'deepmerge'

function extendChunk(original, another) {
     return merge.all([original, another])
}

export { Core, Data, Errors, Styles, Utils, Config, extendChunk }

export default ({Core, Data, Errors, Styles, Utils, Config, extendChunk})

