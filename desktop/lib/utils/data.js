'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.install = install;
exports.download = download;
exports._exists = _exists;
var got = require('got');
var tar = require('tar');
var zlib = require('zlib');
var fs = require('fs-extra');
var request = require('request');
var Zip = require('adm-zip');
var path = require('path');
var progress = require('request-progress');

function install(url, dest, cb) {
  return download(url, dest, cb);
}

function download(url, dest, cb) {
  return new Promise(function (resolve, reject) {
    var isZip = path.extname(url) === '.zip';
    progress(request(url)).on('progress', function (state) {
      cb && cb(state);
    }).on('error', function (error) {
      reject(error);
    }).on('end', function () {
      if (isZip) {
        var zip = new Zip(dest);
        zip.extractAllTo(path.dirname(dest), true);
      }
      resolve();
    }).pipe(fs.createWriteStream(dest));
  });
}

function _exists(url) {
  if (!url) {
    return Promise.reject(new Error('Invalid url'));
  }

  return got.head(url);
}