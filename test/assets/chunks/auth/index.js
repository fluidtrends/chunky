import * as reducers from './data/reducers'
import * as routes from './routes'
import * as operations from './operations'

export default {
  reducers, routes,
  operations: {
    login: {
      method: "POST",
      endpoint: "/post",
      timeout: 2000,
      secure: false,
      adapter: operations.login,
      auth: {
        type: 'Basic',
        base64: true,
        username: 'username',
        password: 'password'
      }
    }
  },
  startRoute: "loading"
}
