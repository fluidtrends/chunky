import * as Errors from '../errors'
import * as Config from '../config'
import * as Utils from '../utils'
import ChunkyError from '../core/Error'

import {
  retrieveAuthToken
} from '../data/cache'

export default class Operation {

  static POST (props) {
    return new Operation(Object.assign(props, { method: "POST" }))
  }

  constructor(props) {
    this._props = props
    this._headers = {
      'Content-Type': Config.API_JSON_CONTENT_TYPE,
      'Accept': Config.API_JSON_CONTENT_TYPE,
      'Cache-Control': 'no-cache'
    }
  }

  get headers() {
    return this._headers
  }

  get props() {
    return this._props
  }

  get method () {
    return this.props.method || Config.API_DEFAULT_METHOD
  }

  get serverUrl () {
    return this.props.serverUrl || Config.API_DEFAULT_SERVER_URL
  }

  get timeout() {
    return this.props.timeout || Config.API_DEFAULT_TIMEOUT
  }

  get endpoint () {
    return this.props.endpoint || Config.API_DEFAULT_ENDPOINT
  }

  get authType () {
    return this.props.authType || Config.API_DEFAULT_AUTH_TYPE
  }

  get body () {
    return this.props.body
  }

  get isSecure() {
    return this.props.secure || Config.API_DEFAULT_SECURE
  }

  onTimeout() { }
  onError(error) { }
  onResponse(response) { }

  send() {
    if (!this.isSecure) {
      return this.sendRequest()
    }

    const self = this
    return retrieveAuthToken().
           then(token => {
              // Inject the auth token
              this._headers.Authorization = `${this.authType} ${token}`
              return this.sendRequest()
            }).
            catch((error) => {
              self.onError(Errors.ACCESS_ERROR)
              return Promise.reject(Errors.ACCESS_ERROR)
            })
  }

  sendRequest () {
    // Prepare the request properties
    const url = `${this.serverUrl}${this.endpoint}`.toLowerCase()
    const options = {
      method: this.method.toUpperCase(),
      headers: this.headers
    }

    if (this.body) {
      // Inject the body if found
      options.body = JSON.stringify(this.body)
    }

    const self = this
    return new Promise((resolve, reject) => {
      Utils.timeout(self.timeout, fetch(url, options)).
            then((response) => self.parseResponse(response)).
            then((response) => {
              self.onResponse(response)
              resolve(response)
            }).
            catch((error) => {
              if (error.name === 'Chunky') {
                self.onTimeout()
                reject(Errors.TIMEOUT_ERROR)
                return
              }
              reject(error)
            })
    })
  }

  parseResponse(response) {
    return new Promise((resolve, reject) => {
      if (!response || response === undefined) {
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
