'use strict';

var firebase = require("firebase-admin");
var firebaseline = require("firebaseline");

function initialize(config) {
  if (firebase.apps.length > 0) {
    // No need to inititalize again
    return;
  }

  // Initialize for the first time
  firebase.initializeApp({
    credential: firebase.credential.cert(config.serviceAccount),
    databaseURL: "https://" + config.serviceAccount.project_id + ".firebaseio.com"
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

module.exports = {
  initialize: initialize,
  save: save
};