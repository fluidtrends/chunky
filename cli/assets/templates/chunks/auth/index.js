import parent from 'react-chunky-auth-chunk'
import config from './chunk.json'
import * as screens from './screens'
import { extendChunk } from 'react-chunky'

const chunk = {
    ...config,
    screens
}

export default extendChunk(parent, chunk)
