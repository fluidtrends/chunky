import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'
import { retrieveAuth } from '../cache'
import { Base64 } from 'js-base64'

export default class RestDataProvider extends DataProvider {

  get defaults () {
    return {
      // Defaults
      timeout: 10000,
      headers: {
        'Content-Type': Config.API_JSON_CONTENT_TYPE,
        'Accept': Config.API_JSON_CONTENT_TYPE
      },
      url: Config.API_DEFAULT_SERVER_URL
    }
  }

  create ({ nodes, options, props }) {
     // Let's see what kind of a resource we want to create
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    // Construct the endpoint
    const endpoint = nodes.join('/')

    const request = {
      method: 'post',
      timeout: this.props.timeout,
      url: `${this.props.url}/${this.props.env === 'production' ? '' : this.props.env + '-'}${endpoint}`,
      headers: this.props.headers,
      body: props
    }

    return this._sendRequest(request)
  }

  retrieve ({ nodes, options, props }) {
     // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    // Construct the endpoint
    const endpoint = nodes.join('/')

    const request = {
      method: 'get',
      timeout: this.props.timeout,
      url: `${this.props.url}/${endpoint}`,
      headers: this.props.headers
    }

    return this._sendRequest(request)
  }

  _prepareAuthHeaders (auth) {
    return new Promise((resolve, reject) => {
      try {
        firebase.auth().currentUser.getIdToken()
                .then((token) => {
                  resolve({ Authorization: Base64.encode(token) })
                })
        .catch(() => resolve())
      } catch (e) {
        resolve()
      }
    })
  }

  _prepareRequest ({ url, method, headers, body }, auth) {
    return this._prepareAuthHeaders(auth)
           .then((authHeaders) => {
             // Prepare the request properties
             const options = {
               method: method.toUpperCase(),
               headers: Object.assign({}, headers, authHeaders)
             }

             if (body) {
               // Inject the body if found
               options.body = JSON.stringify(body)
             }

             console.log(url, options)

             return ({ url, options })
           })
  }

  _timeout (ms, promise) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(Errors.TIMEOUT_ERROR())
      }, ms)
      promise.then(resolve, reject)
    })
  }

  _sendAuthRequest (request, auth) {
    return this._prepareRequest(request, auth)
           .then(({ url, options }) => this._timeout(request.timeout, fetch(url, options)))
           // .then((response) => response.json())
           .then((response) => {
             console.log(response)
             return response.json()
           })
  }

  _sendRequest (request) {
    return retrieveAuth()
            .then((auth) => this._sendAuthRequest(request, auth))
            .catch(() => this._sendAuthRequest(request))
  }

}
