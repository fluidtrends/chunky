import { createSelector } from 'reselect'

const authTrying = (state) => state.auth.trying
const authToken  = (state) => state.auth.token
const authError  = (state) => state.auth.error

export const isAuthenticating = createSelector(
  authTrying,
  (trying) => trying
)

export const hasAuthenticationError = createSelector(
  authError,
  (error) => (error != null)
)

export const getAuthenticationError = createSelector(
  authError,
  (error) => error.message
)

export const getAuthenticationToken = createSelector(
  authToken,
  (token) => token
)
