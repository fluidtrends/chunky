import * as Errors from '../errors'
import * as Config from '../config'
import * as Utils from '../utils'
import ChunkyError from '../core/Error'

import {
  retrieveAuthToken
} from '../data/cache'

export default class FirebaseOperation {

  static TYPE () {
    return { UNKNOWN: 'unknown', 
             EMAIL_SIGNUP: 'register/email', 
             EMAIL_LOGIN: 'login/email', 
             FACEBOOK_LOGIN: 'login/facebook', 
             GOOGLE_LOGIN: 'login/google', 
             TWITTER_LOGIN: 'login/twitter', 
             GITHUB_LOGIN: 'login/github', 
             PHONE_LOGIN: 'login/phone' }
  }

  constructor(props) {
    this._props = props
  }

  get props() {
    return this._props
  }

  get firebase() {
      return this.props.adapter
  }

  get type () {
    return this.props.type || FirebaseOperation.TYPE.UNKNOWN
  }

  init() { }

  start() {
    this.init()

    switch(this.type) {
        case FirebaseOperation.TYPE.EMAIL_SIGNUP:
            return this.emailSignup()
        case FirebaseOperation.TYPE.EMAIL_LOGIN:
            return this.emailLogin()
        case FirebaseOperation.TYPE.FACEBOOK_LOGIN:
            return this.facebookLogin()
        case FirebaseOperation.TYPE.GOOGLE_LOGIN:
            return this.googleLogin()
        case FirebaseOperation.TYPE.TWITTER_LOGIN:
            return this.twitterLogin()
        case FirebaseOperation.TYPE.GITHUB_LOGIN:
            return this.githubLogin()
        case FirebaseOperation.TYPE.PHONE_LOGIN:
            return this.phoneLogin()
        default:
            return Promise.reject(Errors.UNDEFINED_OPERATION())        
    }
  }

  emailSignup() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())              
  }

  emailLogin() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())              
  }

  facebookLogin() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())        
  }

  googleLogin() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())              
  }

  twitterLogin() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())        
  }
    
  githubLogin() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())              
  }

  googleLogin() {
    return Promise.reject(Errors.UNDEFINED_OPERATION())              
  } 
}
