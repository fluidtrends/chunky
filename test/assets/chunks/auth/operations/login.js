import { Core } from '../../../../..'

export default class LoginOperation extends Core.Operation {

  get body() {
    return {
      token: "dummy token"
    }
  }

  onResponse(json) {
    // Save the token
    return cacheAuthToken(json.data)
  }

  onError(error) {
    // console.log("GOT Error", error)
  }

  onTimeout() {
    // console.log("Login timed out");
  }

}
