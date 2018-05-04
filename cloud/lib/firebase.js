'use strict';

var firebase = require('firebase-admin');
var firebaseline = require('firebaseline');
var Base64 = require('js-base64').Base64;

function operation(name, args) {
  return firebaseline.operations[name](firebase, args);
}

function initialize(config) {
  if (firebase.apps.length > 0) {
    // No need to inititalize again
    return;
  }

  // Initialize for the first time
  firebase.initializeApp({
    credential: firebase.credential.cert(config.serviceAccount),
    databaseURL: 'https://' + config.serviceAccount.project_id + '.firebaseio.com'
  });
}

function save(data) {
  // Generate some defaults for each item
  var defaults = function defaults() {
    return {
      timestamp: new Date().getTime()
    };
  };

  return Promise.all(data.map(function (item) {
    return firebase.database().ref(item.path).set(Object.assign({}, defaults(), item.data));
  }));
}

function verifyAccess(event) {
  return new Promise(function (resolve, reject) {
    try {
      var parts = event.headers.Authorization.split();
      var type = parts[0];
      var access = JSON.parse(Base64.decode(parts[1]));

      resolve(access);
    } catch (e) {
      resolve();
    }
  });
}

module.exports = {
  initialize: initialize,
  operation: operation,
  verifyAccess: verifyAccess,
  save: save
};