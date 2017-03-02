import * as Errors from '../../errors'
import * as Config from '../../config'
import {
    retrieveAuthToken
} from '../cache'

export default class RemoteOperation {

    constructor(props) {
        // Keep track of the operation properties
        this.props = props

        // Initialize the basic headers required for all operations
        this._headers = {
            'Content-Type': Config.API_JSON_CONTENT_TYPE,
            'Accept': Config.API_JSON_CONTENT_TYPE,
            'Cache-Control': 'no-cache'
        }

        this.operationServerUrl = props.config.apiUrl
        this.operationMethod = Config.API_POST_METHOD
        this.operationIsSecure = false
        this.operationTimeout = props.config.apiTimeout || Config.API_TIMEOUT
        this.operationAuthType = props.config.apiAuthType || Config.API_SECURITY_TYPE_BEARER
    }

    beforeStart() {
        return Promise.resolve()
    }

    start() {
        return this.beforeStart().
        then(() => this.doStart()).
        catch(error => Promise.reject(this.operationFinishedWithError(error)))
    }

    doStart() {
        if (this.operationIsSecure) {
            // This is a secure operation, so let's look for the authentication token first
            return retrieveAuthToken().then((token) => {
                this._headers.Authorization = `${this.operationAuthType} ${token}`
                return this.startAsyncRemoteCall(this.options)
            }).
            catch(error => Promise.reject(this.operationFinishedWithError(error)))
        }

        // Perform the actual call
        return this.startAsyncRemoteCall(this.options)
    }

    operationFinishedWithError(error) {
        return Errors.GENERIC_ERROR
    }

    operationFinishedWithInvalidStatusCode(statusCode) {
        return Errors.GENERIC_ERROR
    }

    operationFinishedWithSuccess(json) {
        return Promise.resolve(json);
    }

    operationReceivedTimeout() {}

    get options() {
        var opts = {
            method: this.operationMethod,
            headers: this.headers
        }

        if (this.operationBody) {
            opts.body = JSON.stringify(this.operationBody)
        }

        return opts
    }

    get headers() {
        return this._headers
    }

    startAsyncRemoteCall(options) {
        if (!this.operationEndpoint) {
            // Make sure we've got ourselves a valid endpoint
            return Promise.reject(Errors.GENERIC_ERROR)
        }

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // Make sure the operation is responsive within the custom timeout limit
                this.operationReceivedTimeout()

                // Stop the operation right away
                reject(Errors.TIMEOUT_ERROR)
            }, this.operationTimeout)

            // Perform the remote operation
            this.performAsyncRemoteCall(options).

            // Allow the operation to parse the JSON
            then(json => this.operationFinishedWithSuccess(json)).

            // Propagate the parsed result
            then(data => resolve(data)).

            // Also propagate errors, if necessary
            catch(error => reject(this.operationFinishedWithError(error)))
        });
    }

    performAsyncRemoteCall(options) {
        return new Promise((resolve, reject) => {
            const url = `${this.operationServerUrl}${this.operationEndpoint}`

            Chunky.Platform.fetch(url, options).then(response => {
                if (response.status >= 400) {
                    // The operation failed so let's reject this call
                    return response.json().then(json => reject(this.operationFinishedWithInvalidStatusCode(json)))
                }

                return response.json().
                then(json => resolve(json)).
                catch(err => resolve({
                    status: "ok"
                }))
            }).
            catch(err => reject(this.operationFinishedWithError(err)))
        })
    }
}
