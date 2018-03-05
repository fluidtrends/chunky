import React from 'react'
import config from './config'
import firebase from 'firebase'
import firebaseConfig from 'web/firebase-config.json'

config.id = 'chunky'
config.firebase = firebaseConfig

const appId = `${config.id}-${config.name}-${config.domain || 'chunky.io'}`
global.chunky = Object.assign({}, global.chunky, { config })
global.appId = appId

global.firebase = firebase
global.storage = {
  setItem: function (key, value, callback) {
    try {
      localStorage.setItem(`${appId}-${key}`, value)
      callback()
    } catch (e) {
      callback(e)
    }
  },
  getItem: function (key, callback) {
    try {
      const value = localStorage.getItem(`${appId}-${key}`)
      callback(null, value)
    } catch (e) {
      callback(e)
    }
  },
  removeItem: function (key, callback) {
    try {
      localStorage.removeItem(`${appId}-${key}`)
      callback()
    } catch (e) {
      callback(e)
    }
  }
}

try {
  firebase.initializeApp(config.firebase)
} catch (e) {
}
