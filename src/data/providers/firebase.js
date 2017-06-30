import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'
import {
  cacheAuth
} from '../cache'

export default class FirebaseDataProvider extends DataProvider  {

  login({ nodes, options, props }) {
    // Let's see what kind of a login we want to perform
    const loginType = nodes[0]

    if (!loginType || loginType.toLowerCase() !== 'email') {
      // We only support email logins for now
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    // Let's take a look at the credentials
    const email = props.email
    const password = props.password

    return firebase.auth().signInWithEmailAndPassword(email, password).
            then((user) => {
              // Let's keep track of the user locally
              return cacheAuth({ user })
            })
  }

  register({ nodes, options, props }) {
    // Let's see what kind of a login we want to perform
    const loginType = nodes[0]

    if (!loginType || loginType.toLowerCase() !== 'email') {
      // We only support email registrations for now
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    // Let's take a look at the credentials
    const email = props.email
    const password = props.password

    return firebase.auth().createUserWithEmailAndPassword(email, password).
          then((user) => {
            // Let's keep track of the user locally
            return cacheAuth({ user })
          })
  }

  retrieve({ nodes, options, props }) {
     // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(resource)

      if (options.latest) {
        ref.orderByChild("endDate").limitToLast(1).on("child_added", function(snapshot) {
          // Fetch the latest resource only
          resolve(snapshot.val())
        })
        return
      }

      ref.on('value', (snapshot) => {
        // Fetch all the resources
        resolve(snapshot.val())
      })
    })
  }
}
