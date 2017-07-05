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

  update({ nodes, options, props }) {
     // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    // Let's see if we have a field we requested
    const key = (nodes.length > 1 ? nodes[1] : undefined)
    const keyValue = (key ? props[key] : undefined)
    
    if (!key || !keyValue || !props || !props.updates) {
      // We're looking for a specific field, but no value was given
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    }

    // Update the specific fields
    return firebase.database().ref(`${resource}/${keyValue}`).update(props.updates)
  }

  retrieve({ nodes, options, props }) {
     // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    // Let's see if we have a field we requested
    const field = (nodes.length > 1 ? nodes[1] : undefined)
    const fieldValue = (field ? props[field] : undefined)
    
    return new Promise((resolve, reject) => {
      const ref = firebase.database().ref(resource)

      if (field) {
        if (!fieldValue) {
          // We're looking for a specific field, but no value was given
          return Promise.reject(Errors.UNDEFINED_OPERATION())
        }

        ref.orderByChild(field).equalTo(fieldValue).on("child_added", function(snapshot) {
          // Fetch the resource with the specified field
          resolve(snapshot.val())
        })
        return

      }

      if (options.latest) {
        ref.orderByChild("endDate").limitToLast(1).on("child_added", function(snapshot) {
          // Fetch the latest resource only
          resolve(snapshot.val())
        })
        return
      }

      if (options.startAt) {
        const [field, index] = options.startAt.split(":")
        if (field) {
          ref.orderByChild(field).startAt(Number.parseInt(index)).on("value", function(snapshot) {
            // Fetch all the resources, by filter
            var elements = snapshot.val()
            
            if (Array.isArray(elements)) {
              resolve(elements.filter((item) => item))
              return
            }

            var newElements = []
            for(const elementId in elements) {
              if (elements[elementId]) {
                // Make sure we deal with an array
                newElements.push(elements[elementId])
              }
            }
            resolve(newElements)

          })
          return
        }
      }

      ref.on('value', (snapshot) => {
        // Fetch all the resources
        resolve(snapshot.val())
      })
    })
  }
}
