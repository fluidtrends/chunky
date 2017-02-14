import Error from '../core/Error';

// Generic API Errors
export const GENERIC_ERROR                    = new Error("An unexpected error occured")
export const TIMEOUT_ERROR                    = new Error("The operation timed out")
export const ACCESS_ERROR                     = new Error("The operation requires authentication")
export const COULD_NOT_RETRIEVE_USER          = new Error("Unable to retrieve user information")
export const INVALID_LOGIN_ERROR              = new Error("Please make sure your credentials are correct")
export const WARNING_EMPTY_RESPONSE           = "empty response"
export const WARNING_INVALID_RESPONSE         = "invalid response"
