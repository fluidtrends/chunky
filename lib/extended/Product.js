'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ = require('.');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevServer = require('webpack-dev-server');

var _webpackDevServer2 = _interopRequireDefault(_webpackDevServer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function () {
  function Product(props) {
    _classCallCheck(this, Product);

    this._props = props;
  }

  _createClass(Product, [{
    key: 'start',
    value: function start() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          var dir = _path2.default.resolve(_this.dir, '.chunky', 'web');
          _fsExtra2.default.existsSync(dir) && _fsExtra2.default.removeSync(dir);
          _fsExtra2.default.mkdirsSync(dir);

          var configFile = _path2.default.resolve(_this.dir, 'node_modules', 'react-dom-chunky', 'packager', 'config.dev.js');
          var config = require(configFile);

          var manifest = (0, _.loadManifest)(_this);
          var chunks = (0, _.loadChunks)(_this);

          var setup = config({ dir: _this.dir, chunks: chunks, config: manifest, port: 8082 });

          process.noDeprecation = true;

          var server = new _webpackDevServer2.default((0, _webpack2.default)(setup), setup.devServer);

          server.listen(8082, '0.0.0.0', function (error) {
            if (error) {
              console.log(error);
              reject(error);
              return;
            }
            console.log('Web server started');
            resolve();
          });
        } catch (e) {
          console.log(e);
          reject(e);
        }
      });
    }
  }, {
    key: 'create',
    value: function create() {
      if (this.exists) {
        return Promise.reject(new Error('The product already exists'));
      }

      _fsExtra2.default.mkdirsSync(this.dir);

      var packageData = (0, _.generatePackage)({ name: this.name });

      (0, _.createFile)({ root: this.dir, filepath: 'package.json', data: packageData, json: true });

      return (0, _.installTemplate)({ dir: this.dir, home: this.home, template: this.template });
    }
  }, {
    key: 'props',
    get: function get() {
      return this._props;
    }
  }, {
    key: 'id',
    get: function get() {
      return this.props.id;
    }
  }, {
    key: 'name',
    get: function get() {
      return this.props.name;
    }
  }, {
    key: 'template',
    get: function get() {
      return this.props.template;
    }
  }, {
    key: 'home',
    get: function get() {
      return this.props.home;
    }
  }, {
    key: 'exists',
    get: function get() {
      return _fsExtra2.default.existsSync(this.dir);
    }
  }, {
    key: 'dir',
    get: function get() {
      return _path2.default.resolve(this.home, 'products', this.id);
    }
  }]);

  return Product;
}();

exports.default = Product;