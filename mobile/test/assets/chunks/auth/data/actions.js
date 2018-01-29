import { Data, Config } from 'react-chunky'

export const login = (props) => Data.Actions.common.operation("auth/requestAuthToken/login", props)
export const retrieveAuthToken = () => Data.Actions.common.getFromCache("auth/retrieveAuthToken", Config.AUTH_TOKEN_CACHE_KEY)
export const logout = () => Data.Actions.common.deleteFromCache("auth/removeAuthToken", Config.AUTH_TOKEN_CACHE_KEY)
