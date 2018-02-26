import React from 'react'
import config from './config'
import firebase from 'firebase'
import firebaseConfig from 'web/firebase-config.json'

config.id = 'chunky'
config.firebase = firebaseConfig

global.chunky = Object.assign({}, global.chunky, { config })
global.firebase = firebase
global.storage = {
  setItem: function (key, value, callback) {
    try {
      localStorage.setItem(key, value)
      callback()
    } catch (e) {
      callback(e)
    }
  },
  getItem: function (key, callback) {
    try {
      const value = localStorage.getItem(key)
      callback(null, value)
    } catch (e) {
      callback(e)
    }
  },
  removeItem: function (key, callback) {
    try {
      localStorage.removeItem(key)
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
