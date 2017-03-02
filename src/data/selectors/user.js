import { createSelector } from 'reselect'

const userTrying = (state) => state.user.trying
const userData   = (state) => state.user.data
const userError  = (state) => state.user.error

export const isFetchingUser = createSelector(
  userTrying,
  (trying) => trying
)

export const hasUserError = createSelector(
  userError,
  (error) => (error != null)
)

export const getUserError = createSelector(
  userError,
  (error) => error.message || ''
)

export const getUserData = createSelector(
  userData,
  (data) => data
)
