import {
  START_GETTING_USER,
  RECEIVED_USER,
  FAILED_TO_RECEIVE_USER
} from '../actions'

export default function user (state = {}, action) {
  switch (action.type) {
    case START_GETTING_USER:
      return { trying: action.trying }
    case FAILED_TO_RECEIVE_USER:
      return { error: action.error }
    case RECEIVED_USER:
      return { data: action.data }
    default:
      return state
  }
}
