import * as Config from '../../config'
import * as Errors from '../../errors'

export function retrieveAuthToken() {
    return new Promise((resolve, reject) => {
        Chunky.Platform.storage.getItem(Config.AUTH_TOKEN_CACHE_KEY, (error, authToken) => {
            if (error || !authToken) {
                // The token was not found locally
                reject(Errors.COULD_NOT_RETRIEVE_CACHED_TOKEN)
                return
            }
            resolve(authToken)
        })
    })
}

export function cacheAuthToken(token) {
    return new Promise((resolve, reject) => {
        Chunky.Platform.storage.setItem(Config.AUTH_TOKEN_CACHE_KEY, `${token}`, (error) => {

            if (error) {
                // Something went wrong when saving the token
                reject(Errors.COULD_NOT_CACHE_TOKEN)
                return;
            }

            // We're good to go, let's send back the newly received token
            resolve(token)
        })
    })
}

export function clearAuthToken() {
    return new Promise((resolve, reject) => {
        Chunky.Platform.storage.removeItem(Config.AUTH_TOKEN_CACHE_KEY, (error) => {
            if (error) {
                // The token could not be removed
                reject(Errors.COULD_NOT_CLEAR_CACHED_TOKEN)
                return
            }
            resolve()
        })
    })
}

export function retrieveCloudToken() {
    return new Promise((resolve, reject) => {
        Chunky.Platform.storage.getItem(Config.CLOUD_TOKEN_CACHE_KEY, (error, cloudToken) => {
            if (error || !cloudToken) {
                // The token was not found locally
                reject(Errors.COULD_NOT_RETRIEVE_CACHED_CLOUD_TOKEN)
                return
            }
            resolve(cloudToken)
        })
    })
}

export function cacheCloudToken(token) {
    return new Promise((resolve, reject) => {
        Chunky.Platform.storage.setItem(Config.CLOUD_TOKEN_CACHE_KEY, `${token}`, (error) => {

            if (error) {
                // Something went wrong when saving the token
                reject(Errors.COULD_NOT_CACHE_CLOUD_TOKEN)
                return;
            }

            // We're good to go, let's send back the newly received token
            resolve(token)
        })
    })
}

export function clearCloudToken() {
    return new Promise((resolve, reject) => {
        Chunky.Platform.storage.removeItem(Config.CLOUD_TOKEN_CACHE_KEY, (error) => {
            if (error) {
                // The token could not be removed
                reject(Errors.COULD_NOT_CLEAR_CACHED_CLOUD_TOKEN)
                return
            }
            resolve()
        })
    })
}
