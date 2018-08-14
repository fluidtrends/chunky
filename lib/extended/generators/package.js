'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.generatePackage = generatePackage;
function generatePackage(_ref) {
  var name = _ref.name;

  return {
    name: name,
    version: '0.1.0',
    description: 'This is Chunky',
    scripts: {
      test: 'react-savor test',
      lint: 'react-savor lint',
      coverage: 'react-savor coverage',
      codeclimate: 'react-savor codeclimate',
      deployweb: 'aws s3 sync web/build s3://www.chunky.io'
    },
    repository: {
      type: 'git',
      url: 'git+https://github.com/react-chunky/react-chunky-product.git'
    },
    homepage: 'http://www.chunky.io',
    dependencies: {
      'react-dom-chunky': '0.9.x'
    },
    devDependencies: {
      'react-savor': '0.x'
    }
  };
}