import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'

import {
  retrieveAuthToken
} from '../cache'

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
      url: `${this.props.url}/${endpoint}`,
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

  _prepareRequest ({ url, method, headers, body }) {
    // Prepare the request properties
    const options = {
      method: method.toUpperCase(),
      headers
    }

    if (body) {
      // Inject the body if found
      options.body = JSON.stringify(body)
    }

    return { url, options }
  }

  _timeout (ms, promise) {
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        reject(Errors.TIMEOUT_ERROR())
      }, ms)
      promise.then(resolve, reject)
    })
  }

  _sendRequest (request) {
    const requestParams = this._prepareRequest(request)
    return this._timeout(request.timeout, fetch(requestParams.url, requestParams.options))
                .then((response) => response.json())
  }

}
