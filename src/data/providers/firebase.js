import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'
import { operations } from 'firebaseline'
import {
  cacheAuth
} from '../cache'

export default class FirebaseDataProvider extends DataProvider  {

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

  // register({ nodes, options, props }) {
  //   // Let's see what kind of a login we want to perform
  //   const loginType = nodes[0]
  //
  //   if (!loginType || loginType.toLowerCase() !== 'email') {
  //     // We only support email registrations for now
  //     return Promise.reject(Errors.UNDEFINED_OPERATION())
  //   }
  //
  //   // Let's take a look at the credentials
  //   const email = props.email
  //   const password = props.password
  //
  //   // return firebase.auth().createUserWithEmailAndPassword(email, password).
  //   //       then((user) => {
  //   //         // Let's keep track of the user locally
  //   //         return cacheAuth({ user })
  //   //       })
  // }

  // update({ nodes, options, props }) {
  //    // Let's see what kind of a resource we want to retrieve
  //   const resource = nodes[0]
  //
  //   if (!resource) {
  //     // We require a resource to be defined
  //     return Promise.reject(Errors.UNDEFINED_OPERATION())
  //   }
  //
  //   const args = { ...props.target, node, ...props.targetContent }
  //   return operations.update(firebase, args)
  // }

  // add({ nodes, options, props }) {
  //   // Let's see what kind of a resource we want to add
  //   const node = nodes[0]
  //
  //   if (!node) {
  //     // We require a resource to be defined
  //     return Promise.reject(Errors.UNDEFINED_OPERATION())
  //   }
  //   const args = { ...props.target, node, ...props.targetContent }
  //   return operations.add(firebase, args)
  // }

  // unsubscribe({ nodes, options, props }) {
  //    // Let's see what kind of a resource we want to subscribe to
  //   const node = nodes[0]
  //
  //   if (!node) {
  //     // We require a resource to be defined
  //     return Promise.reject(Errors.UNDEFINED_OPERATION())
  //   }
  //
  //   var key = nodes.map(node => (node === ':uid' ? firebase.auth().currentUser.uid : node)).join("/")
  //
  //   return operations.unsubscribe(firebase, { key })
  // }

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
          return data
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

  retrieve({ nodes, options, props }) {
     // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    const key = nodes.map(node => (node === ':uid' ? firebase.auth().currentUser.uid : node)).join("/")
    var params = { key }

    if (props.before) {
      params.endAt = props.before
    }

    if (options.latest) {
      params.orderBy = "timestamp"
      params.limitToLast = options.latest
    }

    return operations.retrieve(firebase, params).
                      then(data => {
                        if (!options.resolve) {
                          return data
                        }

                        return Promise.all((Array.isArray(data) ? data : [data]).map(item => {
                          const path = `${options.resolve}/${item._id}`
                          console.log("path", path)
                          return operations.retrieve(firebase,  { key: path })
                        }))
                      })}
}
