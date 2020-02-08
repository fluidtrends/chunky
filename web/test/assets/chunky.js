import * as chunks from './chunks'

export default {
  id: 'chunky',
  info: { 
    analytics: {} 
  },
  chunks,
  sections:  {
    start: {
      stack: ["auth", "intro", "auth/main", "test"]
    }
  },
  theme: {
    statusBarColor: 'material.blue.300',
    statusBarType: 'light-content',
    backgroundColor: 'material.grey.100'
  }
}
