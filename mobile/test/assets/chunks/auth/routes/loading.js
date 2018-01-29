import screen from '../screens/loading'
import container from '../data/containers'

export default {
  screen,
  container,
  transitions: {
    default: {
      id: "auth/loading",
      animation: "PushFromRight"
    },
    noauth: {
      id: "auth/loading",
      type: "replace",
      animation: "PushFromRight"
    }
  }
}
