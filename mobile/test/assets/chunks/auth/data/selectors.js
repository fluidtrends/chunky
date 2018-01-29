import { Data, Errors } from 'react-chunky'

export const hasCachedAuthToken = Data.Selectors.common.hasData("auth/cache")
export const getCachedAuthToken = Data.Selectors.common.getData("auth/cache")
export const hasCachedAuthTokenError = Data.Selectors.common.hasError("auth/cache")
export const getCachedAuthTokenError = Data.Selectors.common.getError("auth/cache")

export const hasAuthToken = Data.Selectors.common.hasData("auth/remote")
export const getAuthToken = Data.Selectors.common.getData("auth/remote")
export const hasAuthTokenError = Data.Selectors.common.hasError("auth/remote")
export const getAuthTokenError = Data.Selectors.common.getError("auth/remote")
