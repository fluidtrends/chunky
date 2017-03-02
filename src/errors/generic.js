import Error from '../core/Error';

// Generic Errors
export const COULD_NOT_RETRIEVE_CACHED_TOKEN = () => new Error("Unable to retrieve cached authentication token")
export const COULD_NOT_CLEAR_CACHED_TOKEN = () => new Error("Unable to clean up the cached authentication token")
export const COULD_NOT_CACHE_TOKEN = () => new Error("Unable to cache authentication token")
export const COULD_NOT_RETRIEVE_CACHED_CLOUD_TOKEN = () => new Error("Unable to retrieve cached cloud token")
export const COULD_NOT_CLEAR_CACHED_CLOUD_TOKEN = () => new Error("Unable to clean up the cached cloud token")
export const COULD_NOT_CACHE_CLOUD_TOKEN = () => new Error("Unable to cache cloud token")
export const UNABLE_TO_LOAD_APP = () => new Error("Unable to load the application")
export const UNABLE_TO_LOAD_ROUTE = (name, reason) => new Error(`Unable to load route ${name}, because ${reason}`)
