import * as Core from './core'
import * as Data from './data'
import * as Errors from './errors'
import * as Generators from './generators'
import * as Styles from './styles'
import * as Config from './config'
import merge from 'deepmerge'

function extendChunk (original, another) {
  return merge.all([original, another])
}

export { Core, Data, Errors, Styles, Config, Generators, extendChunk }

export default ({ Core, Data, Errors, Generators, Styles, Config, extendChunk })
