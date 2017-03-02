import {
  START_LOGIN,
  FAILED_LOGIN,
  SUCCESSFUL_LOGIN
} from '../actions'

export default function auth (state = {}, action) {
  switch (action.type) {
    case START_LOGIN:
      return { trying: action.trying }
    case FAILED_LOGIN:
      return { error: action.error }
    case SUCCESSFUL_LOGIN:
      return { token: action.token }
    default:
      return state
  }
}
