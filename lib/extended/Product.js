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

var _cpy = require('cpy');

var _cpy2 = _interopRequireDefault(_cpy);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function () {
  function Product(props) {
    _classCallCheck(this, Product);

    this._props = props;
  }

  _createClass(Product, [{
    key: 'compilerConfig',
    value: function compilerConfig(_ref) {
      var dir = _ref.dir,
          port = _ref.port;

      return {
        host: '0.0.0.0',
        watchOptions: {
          poll: true,
          aggregateTimeout: 100
        },
        // inline: true,
        // quiet: true,
        // noInfo: true,
        // stats: {
        //   assets: false,
        //   colors: true,
        //   version: false,
        //   hash: false,
        //   timings: false,
        //   chunks: false,
        //   chunkModules: false,
        //   modules: false
        // },
        port: port,
        contentBase: _path2.default.resolve(dir, '.chunky', 'web'),
        watchContentBase: true,
        historyApiFallback: true,
        hot: true
      };
    }
  }, {
    key: 'start',
    value: function start(cb) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        try {
          process.noDeprecation = true;

          var dir = _path2.default.resolve(_this.dir, '.chunky', 'web');
          _fsExtra2.default.existsSync(dir) && _fsExtra2.default.removeSync(dir);
          _fsExtra2.default.mkdirsSync(dir);

          var manifest = (0, _.loadManifest)(_this);
          var chunks = (0, _.loadChunks)(_this);

          var root = _path2.default.resolve(_this.dir, '..', '..');
          var configFile = _path2.default.resolve(_this.dir, 'node_modules', 'react-dom-chunky', 'packager', 'config.dev.js');
          var config = require(configFile);
          var setup = config({ dir: _this.dir, chunks: chunks, config: manifest, root: root, port: 8082 });
          var compConfig = _this.compilerConfig({ dir: _this.dir, root: root, port: 8082 });

          var compiler = (0, _webpack2.default)(setup);
          compiler.plugin('done', function (stats) {
            cb && cb(Object.assign({}, { compiled: true, compiling: false }, stats.compilation.errors.length > 0, { errors: stats.compilation.errors }));
          });
          compiler.plugin('compile', function (params) {
            cb && cb(Object.assign({}, { compiled: false, compiling: true }));
          });

          var server = new _webpackDevServer2.default(compiler, compConfig);
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
    key: 'installDependencies',
    value: function installDependencies() {
      var depsDir = _path2.default.resolve(this.dir, 'node_modules');
      if (!_fsExtra2.default.existsSync(depsDir)) {
        _fsExtra2.default.mkdirsSync(depsDir);
      }

      var srcDepsDir = _path2.default.resolve(this.dir, '..', '..', 'node_modules');
      var destDepsDir = _path2.default.resolve(this.dir, 'node_modules');

      var deps = ['react-dom-chunky'];
      _fsExtra2.default.copySync(_path2.default.resolve(srcDepsDir, 'react-dom-chunky'), _path2.default.resolve(destDepsDir, 'react-dom-chunky'));
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
      this.installDependencies();

      var template = Object.assign({}, this.template, { name: this.name });
      return (0, _.installTemplate)({ dir: this.dir, home: this.home, template: template });
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