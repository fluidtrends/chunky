import * as Errors from '../errors'
import * as Config from '../config'
import * as Utils from '../utils'
import ChunkyError from '../core/Error'

import {
  retrieveAuthToken
} from '../data/cache'

export default class DefaultOperation {

  static POST (props) {
    return new DefaultOperation(Object.assign(props, { method: "POST" }))
  }

  constructor(props) {
    this._props = props
    this._headers = {
      'Content-Type': Config.API_JSON_CONTENT_TYPE,
      'Accept': Config.API_JSON_CONTENT_TYPE,
      'Cache-Control': 'no-cache'
    }

    if (this.props.body) {
      for (let item in this.props.body) {
        this.addBody(item, this.props[this.props.body[item]] || this.props.body[item])
      }
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
    return this._body
  }

  get isSecure() {
    return this.props.secure || Config.API_DEFAULT_SECURE
  }

  addHeader(name, value) {
    this._headers[name] = value
  }

  addBody(name, value) {
    this._body = this._body || {}
    this._body[name] = value
  }

  onTimeout() { }
  onError(error) { }
  onResponse(response) {
    return Promise.resolve(response)
  }
  init() { }

  start() {
    this.init()

    if (!this.isSecure) {
      return this.sendRequest()
    }

    const self = this
    return retrieveAuthToken().
      then(token => {
        // Inject the auth token
        self.addAuthToken(token)
        return this.sendRequest()
      }).
      catch((error) => {
        self.onError(error)
        return Promise.reject(error)
      })
  }

  createBasicAuthToken (username, password, encodeBase64 = true){
    if (!username || !password) {
      return
    }
    const basicAuthToken = `${username}:${password}`
    return encodeBase64 ? Utils.encodeBase64(basicAuthToken) : basicAuthToken
  }

  addAuthToken (token) {
    const tokenValue = (typeof token === 'string' ? token : token.tokenHashKey)
    this.addHeader('Authorization', `${this.authType} ${tokenValue}`)
  }

  addAuthHeader(type, value, encodeBase64 = false) {
    const newValue = encodeBase64 ? Utils.encodeBase64(value) : value
    this.addHeader('Authorization', `${type} ${newValue}`)
  }

  addAuthCredentials(username, password, type, encodeBase64 = false) {
    if (!username || !password) {
      return
    }

    this.addAuthHeader(type, `${username}:${password}`, encodeBase64)
  }

  injectAuthCredentials() {
    if (!this.props.auth) {
      return
    }

    // Inject authentification, if any
    const username = this.props[this.props.auth.username] || this.props.username
    const password = this.props[this.props.auth.password] || this.props.password
    const type = this.props[this.props.auth.type] || 'Basic'
    const base64 = this.props[this.props.auth.base64] || true

    this.addAuthCredentials(username, password, type, base64)
  }

  prepareRequest () {
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

    if (this.props.headers) {
      // Looks like we've got some custom headers, let's add them all
      this._headers = Object.assign(this._headers, this.props.headers)
    }

    this.injectAuthCredentials()

    return {url, options}
  }

  sendRequest () {
    let requestParams = this.prepareRequest()
    const self = this
    return new Promise((resolve, reject) => {
      Utils.timeout(self.timeout, fetch(requestParams.url, requestParams.options)).
            then((response) => self.parseResponse(response)).
            then((response) => self.onResponse(response)).
            then((response) => resolve(response)).
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
        resolve({ status: 0, warning: Errors.WARNING_EMPTY_RESPONSE, data: {} })
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
