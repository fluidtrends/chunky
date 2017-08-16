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
    
    // return firebase.auth().createUserWithEmailAndPassword(email, password).
    //       then((user) => {
    //         // Let's keep track of the user locally
    //         return cacheAuth({ user })
    //       })
  }

  update({ nodes, options, props }) {
     // Let's see what kind of a resource we want to retrieve
    const resource = nodes[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    const args = { ...props.target, node, ...props.targetContent }
    return operations.update(firebase, args)

    // // Let's see if we have a field we requested
    // const key = (nodes.length > 1 ? nodes[1] : undefined)
    // const keyValue = (key ? props[key] : undefined)
    
    // if (!key || !keyValue || !props || !props.updates) {
    //   // We're looking for a specific field, but no value was given
    //   return Promise.reject(Errors.UNDEFINED_OPERATION())
    // }

    // // Update the specific fields
    // return firebase.database().ref(`${resource}/${keyValue}`).update(props.updates)
  }

  add({ nodes, options, props }) {
    // Let's see what kind of a resource we want to add
    const node = nodes[0]

    if (!node) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 
    const args = { ...props.target, node, ...props.targetContent }
    return operations.add(firebase, args)
  }

  unsubscribe({ nodes, options, props }) {
     // Let's see what kind of a resource we want to subscribe to
    const node = nodes[0]

    if (!node) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    var key = nodes.map(node => (node === ':uid' ? firebase.auth().currentUser.uid : node)).join("/")

    return operations.unsubscribe(firebase, { key })
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

    if (!options.resolve) {
      // Just a plain retrieval
      return operations.retrieve(firebase, params)
    }

    // Retrieve and resolve
    return operations.retrieve(firebase, params).then(data => {
      const id = data._id
      delete data._id

      console.log(data)

      return Promise.all(Object.keys(data).map(item => operations.retrieve(firebase, Object.assign({}, { key: `${options.resolve}/${item}` })))).
                     then(all => all.filter(i => { 
                          console.log(props.before, i.timestamp, i.timestamp < props.before)
                         return (props.before ? i.timestamp < props.before : i)
                      })) 
    })

    // // Let's see if we have a field we requested
    // const field = (nodes.length > 1 ? nodes[1] : undefined)
    // const fieldValue = (field ? props[field] : undefined)

    // if (props.key && !field) {
    //   return firebase.database().ref(resource + "/" + props.key).once('value').then(snapshot => snapshot.val())
    // }

    // return new Promise((resolve, reject) => {
    //   const ref = firebase.database().ref(resource)

    //   if (field) {
    //     if (!fieldValue) {
    //       // We're looking for a specific field, but no value was given
    //       return Promise.reject(Errors.UNDEFINED_OPERATION())
    //     }

    //     ref.orderByChild(field).equalTo(fieldValue).once("child_added", function(snapshot) {
    //       // Fetch the resource with the specified field
    //       resolve(snapshot.val())
    //     })
    //     return

    //   }

    //   if (options.latest) {
    //     ref.orderByChild("endDate").limitToLast(1).on("child_added", function(snapshot) {
    //       // Fetch the latest resource only
    //       resolve(snapshot.val())
    //     })
    //     return
    //   }

    //   if (options.startAt) {
    //     const [field, index] = options.startAt.split(":")
    //     if (field) {
    //       ref.orderByChild(field).startAt(Number.parseInt(index)).on("value", function(snapshot) {
    //         // Fetch all the resources, by filter
    //         var elements = snapshot.val()
            
    //         if (Array.isArray(elements)) {
    //           resolve(elements.filter((item) => item))
    //           return
    //         }

    //         var newElements = []
    //         for(const elementId in elements) {
    //           if (elements[elementId]) {
    //             // Make sure we deal with an array
    //             newElements.push(elements[elementId])
    //           }
    //         }
    //         resolve(newElements)

    //       })
    //       return
    //     }
    //   }

    //   ref.once('value', (snapshot) => {
    //     // Fetch all the resources
    //     resolve(snapshot.val())
    //   })
    // })
  }
}
