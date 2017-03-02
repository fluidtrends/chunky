import Base64 from 'base-64'
import RemoteOperation from './RemoteOperation'
import {
    Token
} from '../model'
import * as Errors from '../../errors'
import * as Config from '../../config'
import {
    cacheAuthToken
} from '../cache'

export default class AuthenticateOperation extends RemoteOperation {

    constructor(props) {
        super(props)

        if (props.authType && props.authType === 'simple') {
            // We want to simply send over the credentials in the body
            this.operationBody = {
                username: props.username,
                password: props.password
            }
        } else {
            // This is the default behaviour, where we just sign
            // the request with a Basic Base64 Authorization token
            let token = Base64.encode(`${props.username}:${props.password}`)
            this._headers.Authorization = `Basic ${token}`
        }

        // Initialize the operation
        this.operationEndpoint = props.config.apiAuthEndpoint
    }

    operationFinishedWithSuccess(json) {
        // Let's build our token from the remote data
        if(this.props.config.apiAuthTypeImplementation && this.props.config.apiAuthTypeImplementation === 'simple'){
          return cacheAuthToken(json.token)
        }
        else if(this.props.config.apiAuthTypeImplementation && this.props.config.apiAuthTypeImplementation === 'basic'){
          return cacheAuthToken(json.access_token)
        }
        return cacheAuthToken(new Token(json))
    }

    operationFinishedWithInvalidStatusCode(statusCode) {
        return Errors.INVALID_LOGIN_ERROR
    }

    operationFinishedWithError(error) {
        return Errors.INVALID_LOGIN_ERROR
    }
}
