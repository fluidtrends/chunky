'use strict';

function loadFile(file) {
  return require(process.cwd() + '/' + file);
}

function loadManifest() {
  return loadFile('chunky.json');
}

function loadSecureConfig() {
  return loadFile('.chunky.json');
}

function loadSecureCloudConfig() {
  return loadSecureConfig().cloud[loadEnv()];
}

function loadInfo() {
  var parts = process.env.AWS_LAMBDA_FUNCTION_NAME.split('-');
  if (!parts || parts.length !== 3) {
    return;
  }

  return {
    service: parts[0],
    env: parts[1],
    function: parts[2]
  };
}

function loadChunk() {
  var chunk = loadFile('chunk.json');

  if (!chunk || !chunk.service) {
    throw new Error('Missing chunk manifest');
  }

  return chunk;
}

function loadRequiredFields(chunk) {
  var info = loadInfo();

  if (!info || !info.function || !chunk || !chunk.service || !chunk.service.requiredFields || !chunk.service.requiredFields[info.function]) {
    return [];
  }

  return chunk.service.requiredFields[info.function];
}

function loadEnv() {
  return process.env.CHUNKY_ENV || 'dev';
}

module.exports = {
  loadEnv: loadEnv,
  loadInfo: loadInfo,
  loadChunk: loadChunk,
  loadManifest: loadManifest,
  loadSecureConfig: loadSecureConfig,
  loadRequiredFields: loadRequiredFields,
  loadSecureCloudConfig: loadSecureCloudConfig
};