import * as common from './common'
import * as cache from '../cache'
import * as config from '../../config'

export const retrieveAuthToken = () => common.getFromCache("retrieveAuthToken", config.AUTH_TOKEN_CACHE_KEY)
