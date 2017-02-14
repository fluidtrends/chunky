import * as Errors from '../../errors'
import * as Config from '../../config'
import {
  retrieveAuthToken
} from '../cache'

export default class DefaultDataClient {

    constructor(props) {
      this._props = props

      // Initialize the basic headers required for all operations
      this._headers = {
        'Content-Type': Config.API_JSON_CONTENT_TYPE,
        'Accept': Config.API_JSON_CONTENT_TYPE,
        'Cache-Control': 'no-cache'
      }
    }

    get props () {
      return this._props || {}
    }

    get timeout() {
      return this.props.timeout || Config.API_DEFAULT_TIMEOUT
    }

    get serverUrl () {
      return Config.API_DEFAULT_SERVER_URL
    }

    secureRequest(request) {
      return retrieveAuthToken().then(token => {
        // Inject the auth token
        this._headers.Authorization = `JWT ${token}`

        // Perform the request
      })
    }

    sendRequest(method, endpoint, body) {
      // Prepare the request properties
      const url = `${this.serverUrl}${endpoint}`
      const options = { method }

      if (body) {
        // Inject the body if found
        options.body = JSON.stringify(body)
      }

      // This is the actual call we're about to perform
      const call = Chunky.Platform.fetch(url, options)

      // We want to setup a timeout for the call
      const timeout = new Promise((resolve, reject) => {
        setTimeout(() => {
          // Stop the operation right away because we've ran out of time
          call.reject(Errors.TIMEOUT_ERROR)
        }, this.timeout)
      })

      // We run the call and if the timeout triggers first, the call gets ignored
      return Promise.race([timeout, call]).then(response => this.parseResponse(response))
    }

    parseResponse(response) {
      return new Promise((resolve, reject) => {
        if (!response || response.json() === undefined) {
          // If the response does not contain a json payload, we won't fail this
          // response but we'll send it back with a warning
          resolve({ status: response.status, warning: Errors.WARNING_EMPTY_RESPONSE, data: {} })
          return
        }

        // We do have some json, so let's try to parse it
        response.json().

             // Looks like the json is valid, the request is good to go now
             then(json => resolve({status: response.status, data: json })).

             // Sounds like an invalid json; we don't fail the response but we
             // will need to flag it as a warning
             catch(err => resolve({ status: response.status, warning: Errors.WARNING_INVALID_RESPONSE, data: {} }))
       })
    }
}
