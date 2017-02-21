import screen from '../screens/loading'
import container from '../data/containers'

export default {
  screen,
  container,
  transitions: {
    noauth: {
      id: "auth/login",
      type: "replace",
      animation: "PushFromRight"
    },
    auth: {
      id: "home/dashboard",
      type: "replace",
      animation: "PushFromRight"
    }
  }
}
