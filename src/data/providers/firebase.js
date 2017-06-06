import * as Errors from '../../errors'
import * as Config from '../../config'
import ChunkyError from '../../core/Error'
import DataProvider from '../../core/DataProvider'
import {
  cacheAuth
} from '../cache'

export default class FirebaseDataProvider extends DataProvider  {

  loginOperation(args, options, props) {
    // Let's see what kind of a login we want to perform
    const loginType = args[0]

    if (!loginType || loginType.toLowerCase() !== 'email') {
      // We only support email logins for now
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    // Let's take a look at the credentials
    const email = props.username
    const password = props.password

    return firebase.auth().signInWithEmailAndPassword(email, password).
            then((user) => {
              // Let's keep track of the user locally
              return cacheAuth({ user })
            }).
            catch((err) => {
              throw Errors.INVALID_LOGIN_ERROR
            })
  }

  retrieveOperation(args, options, props) {
     // Let's see what kind of a resource we want to retrieve
    const resource = args[0]

    if (!resource) {
      // We require a resource to be defined
      return Promise.reject(Errors.UNDEFINED_OPERATION())
    } 

    return new Promise((resolve, reject) => {
      firebase.database().ref(resource).on('value', (snapshot) => {
        // Fetch the resource
        resolve( snapshot.val() )
      })
    })
  }
}
