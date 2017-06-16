import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'

import {
  retrieveAuthToken
} from '../cache'

const remote = {
    timeout,
    prepareRequest,
    parseResponse,
    sendRequest
}

function prepareRequest (request) {
  // Prepare the request properties
  const url = `${request.url}`.toLowerCase()
  const options = {
    method: request.method.toUpperCase(),
    headers: request.headers
  }

  if (request.body) {
    // Inject the body if found
    options.body = JSON.stringify(request.body)
  }

  return {url, options}
}

function parseResponse(response) {
    return new Promise((resolve, reject) => {
      if (!response || response === undefined) {
        // If the response does not contain a json payload, we won't fail this
        // response but we'll send it back with a warning
        resolve({ status: 0, warning: 'Empty response', data: {} })
        return
      }

      // We do have some json, so let's try to parse it
      response.json().

           // Looks like the json is valid, the request is good to go now
           then(json => resolve({ status: response.status, data: json })).

           // Sounds like an invalid json; we don't fail the response but we
           // will need to flag it as a warning
           catch(err => resolve({ status: response.status, warning: 'Invalid response', data: {} }))
     })
}

function timeout(ms, promise) {
  return new Promise(function(resolve, reject) {
      setTimeout(function() {
          reject(new Error('Operation timed out'))
      }, ms)
      promise.then(resolve, reject)
  })
}

function sendRequest (request) {
  let requestParams = remote.prepareRequest(request)
  return new Promise((resolve, reject) => {
    remote.timeout(request.timeout, fetch(requestParams.url, requestParams.options)).
          then((response) => remote.parseResponse(response)).
          then((response) => resolve(response.data)).
          catch((error) => {
            reject(error)
          })
  })
}

export default class RemoteDataProvider extends DataProvider  {

  retrieve({ nodes, options, props }) {
     // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    const request = {
      method: 'get',
      timeout: 5000,
      url: 'https://api.github.com/users/rauchg/repos'
      // body: {},
      // headers: {}
    }

    return remote.sendRequest(request)
  }

  // parseProps(props) {
  //   this._props = props
  //   this._headers = {
  //     'Content-Type': Config.API_JSON_CONTENT_TYPE,
  //     'Accept': Config.API_JSON_CONTENT_TYPE,
  //     'Cache-Control': 'no-cache'
  //   }

  //   if (this.props.body) {
  //     for (let item in this.props.body) {
  //       this.addBody(item, this.props[this.props.body[item]] || this.props.body[item])
  //     }
  //   }
  // }

  // get headers() {
  //   return this._headers
  // }

  // get props() {
  //   return this._props
  // }

  // get method () {
  //   return this.props.method || Config.API_DEFAULT_METHOD
  // }

  // get serverUrl () {
  //   return this.props.serverUrl || Config.API_DEFAULT_SERVER_URL
  // }

  // get timeout() {
  //   return this.props.timeout || Config.API_DEFAULT_TIMEOUT
  // }

  // get endpoint () {
  //   return this.props.endpoint || Config.API_DEFAULT_ENDPOINT
  // }

  // get authType () {
  //   return this.props.authType || Config.API_DEFAULT_AUTH_TYPE
  // }

  // get body () {
  //   return this._body
  // }

  // get isSecure() {
  //   return this.props.secure || Config.API_DEFAULT_SECURE
  // }

  // addHeader(name, value) {
  //   this._headers[name] = value
  // }

  // addBody(name, value) {
  //   this._body = this._body || {}
  //   this._body[name] = value
  // }

  // onTimeout() { }
  // onError(error) { }
  // onResponse(response) {
  //   return Promise.resolve(response)
  // }
  // init() { }

  // start() {
  //   this.init()

  //   if (!this.isSecure) {
  //     return this.sendRequest()
  //   }

  //   const self = this
  //   return retrieveAuthToken().
  //     then(token => {
  //       // Inject the auth token
  //       self.addAuthToken(token)
  //       return this.sendRequest()
  //     }).
  //     catch((error) => {
  //       self.onError(error)
  //       return Promise.reject(error)
  //     })
  // }

  // createBasicAuthToken (username, password, encodeBase64 = true){
  //   if (!username || !password) {
  //     return
  //   }
  //   const basicAuthToken = `${username}:${password}`
  //   return encodeBase64 ? Utils.encodeBase64(basicAuthToken) : basicAuthToken
  // }

  // addAuthToken (token) {
  //   const tokenValue = (typeof token === 'string' ? token : token.tokenHashKey)
  //   this.addHeader('Authorization', `${this.authType} ${tokenValue}`)
  // }

  // addAuthHeader(type, value, encodeBase64 = false) {
  //   const newValue = encodeBase64 ? Utils.encodeBase64(value) : value
  //   this.addHeader('Authorization', `${type} ${newValue}`)
  // }

  // addAuthCredentials(username, password, type, encodeBase64 = false) {
  //   if (!username || !password) {
  //     return
  //   }

  //   this.addAuthHeader(type, `${username}:${password}`, encodeBase64)
  // }

  // injectAuthCredentials() {
  //   if (!this.props.auth) {
  //     return
  //   }

  //   // Inject authentification, if any
  //   const username = this.props[this.props.auth.username] || this.props.username
  //   const password = this.props[this.props.auth.password] || this.props.password
  //   const type = this.props[this.props.auth.type] || 'Basic'
  //   const base64 = this.props[this.props.auth.base64] || true

  //   this.addAuthCredentials(username, password, type, base64)
  // }

  

}

