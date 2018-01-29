import * as chunks from './chunks'

export default {
  id: "chunky",
  chunks,
  startChunk: "auth",
  api: {
    serverUrl: "https://httpbin.org",
    authType: "JWT"
  },
  theme: {
    statusBarColor: "material.blue.300",
    statusBarType: "light-content",
    backgroundColor: "material.grey.100"
  }
}
