import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'
import { operations } from 'firebaseline'
import {
  retrieveCachedItem,
  cacheItem,
  cacheAuth
} from '../cache'

export default class FirebaseDataProvider extends DataProvider  {

  store({ nodes, options, props }) {
    // Let's see what kind of a resource we want to subscribe to
    const node = nodes[0]

    if (!node || !props.data) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    var key = nodes.map(node => (node === ':uid' ? firebase.auth().currentUser.uid : node)).join("/")
    return operations.store(firebase, { key, data: props.data, contentType: options.contentType })
  }

  login({ nodes, options, props }) {
    if (!props.email || !props.password || !operations.login) {
      // We only support email logins for now
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    // Let's take a look at the credentials
    const email = props.email
    const password = props.password

    // Attempt to sign in
    return operations.login(firebase, { email, password }).

            // Let's keep track of the user locally
            then((user) => cacheAuth({ user: user.toJSON() }))
  }

  register({ nodes, options, props }) {
    if (!props.email || !props.password || !operations.register) {
      // We only support email for now
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    // Let's take a look at the credentials
    const name = props.name
    const email = props.email
    const password = props.password

    // Attempt to register user
    return operations.register(firebase, Object.assign({ appAuth: true }, props)).

            // Login immediately
            then(() => operations.login(firebase, { email, password })).

            // Let's keep track of the user locally
            then((user) => cacheAuth({ user: user.toJSON() }))
  }

  subscribe({ nodes, options, props }) {
    // Let's see what kind of a resource we want to subscribe to
    const node = nodes[0]

    if (!node) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    var key = nodes.map(node => (node === ':uid' ? firebase.auth().currentUser.uid : node)).join("/")
    var params = { key }

    if (options.latest) {
      params.orderBy = "timestamp"
      params.limitToLast = options.latest
    }

    params.onStarted = props.onStarted
    params.onReceivedData = (data) => {
      if (!options.resolve) {
          // Just a plain retrieval
          props.onReceivedData && props.onReceivedData(data)
          return
      }

      var ops = []
      for (const itemKey in data) {
        key = `${options.resolve}/${itemKey}`
        ops.push(operations.retrieve(firebase, { key }))
      }
      return Promise.all(ops).then(all => {
        props.onReceivedData && props.onReceivedData(all)
      })
    }

    return operations.subscribe(firebase, params)
  }

  update({ nodes, options, props }) {
    if (!nodes || nodes.length < 1) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    const key = nodes.map(node => (node === ':uid' ? firebase.auth().currentUser.uid : node)).join("/")
    const params = { key, ...props }
    return operations.update(firebase, params)
  }

  add({ nodes, options, props }) {
    if (!nodes || nodes.length < 1) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    const params = { ...props,  node: nodes[0] }
    return operations.add(firebase, params)
  }

  retrieve({ nodes, options, props }) {
    // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    const key = nodes.map(node => (node === ':uid' ? firebase.auth().currentUser.uid : node)).join("/")
    var params = { key }

    if (options.latest) {
      params.orderBy = "timestamp"
      params.limitToLast = options.latest
    }

    if (props.before) {
      params.orderBy = "timestamp"
      params.endAt = props.before
    }

    var chain = Promise.resolve()


    if (options.cache) {
      // Check if this was cached
      chain = new Promise((resolve, reject) => retrieveCachedItem(`chunky_${params.key}`).
                  then(data => resolve(data)).
                  catch(error => resolve()))
    }

    return chain.then((cachedData) => {
             if (cachedData) {
               return cachedData
             }
             return operations.retrieve(firebase, params).then(data => {
                if (!options.resolve) {
                  return data
                }

                // Make sure we're dealing with a list
                data = (Array.isArray(data) ? data : [data])

                if (params.orderBy === "timestamp") {
                  data = data.sort((a, b) => (Number.parseInt(b.timestamp) - Number.parseInt(a.timestamp)))
                }

                return Promise.all(data.map(item => {
                  const path = `${options.resolve}/${item._id}`
                  return operations.retrieve(firebase,  Object.assign({ key: path }))
                }))
             }).
             then((dataToBeCached) => {
               if (!options.cache) {
                 return dataToBeCached
               }
               // Cache this data
               return cacheItem(`chunky_${params.key}`, dataToBeCached)
             })
         })
   }
}
