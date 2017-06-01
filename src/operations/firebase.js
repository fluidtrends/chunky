import * as Errors from '../errors'
import * as Config from '../config'
import * as Utils from '../utils'
import ChunkyError from '../core/Error'

import {
  retrieveAuthToken,
  cacheAuthToken
} from '../data/cache'

export default class FirebaseOperation {

  static TYPES () {
    return { UNKNOWN: 'unknown', 
             REGISTER: 'register', 
             LOGIN: 'login', 
             FETCH: 'fetch' }
  }

  constructor(props) {
    this._props = this._parseProps(props)
  }

  _parseProps(props) {
    // Start off assuming no valid props
    this._type = FirebaseOperation.TYPES().UNKNOWN
    this._options = []
    
    if (!props.type) {
      // Looks like this operation did not define a type
      return props
    } 

    // Let's look through the type    
    const options = props.type.split("/")

    if (!options || options.length < 1) { 
      // We expect at least a simple type
      return props
    } 
    
    // Great, we have a type    
    this._type = options[0]

    // We might even have some options
    this._options = options.slice(1)

    return props
  }

  get props() {
    return this._props
  }

  get type () {
    return this._type
  }

  get options() {
    return this._options
  }

  start() {

    switch(this.type) {
        case FirebaseOperation.TYPES().LOGIN:
            return this.login()
        case FirebaseOperation.TYPES().FETCH:
            return this.fetch()
        default:
            return Promise.reject(Errors.UNDEFINED_OPERATION())        
    }
  }

  fetch() {
    if (this.options.length <= 0) {
      // We need at least one option
      return Promise.reject(Errors.MISSING_OPERATION_OPTIONS())
    }

    // Find the root node
    const node = this.options[0]

    return new Promise((resolve, reject) => {
      firebase.database().ref(node).on('value', (snapshot) => {
        resolve( snapshot.val() )
      })
    })
  }

  login() {
    const email = this.props.username
    const password = this.props.password

    return firebase.auth().signInWithEmailAndPassword(email, password).
            then((user) => {
              // Let's inject the hash in the main token value
              return cacheAuthToken({ user })
            }).
            catch((err) => {
              throw Errors.INVALID_LOGIN_ERROR
            })
  }
}
