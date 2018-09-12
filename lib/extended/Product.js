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

var _cpy = require('cpy');

var _cpy2 = _interopRequireDefault(_cpy);

var _recursiveReaddir = require('recursive-readdir');

var _recursiveReaddir2 = _interopRequireDefault(_recursiveReaddir);

var _deepmerge = require('deepmerge');

var _deepmerge2 = _interopRequireDefault(_deepmerge);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function () {
  function Product(props) {
    _classCallCheck(this, Product);

    this._props = props;
  }

  _createClass(Product, [{
    key: 'loadFileList',
    value: function loadFileList() {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var ignore = function ignore(file, stats) {
          return _path2.default.basename(file).charAt(0) === '.' || _path2.default.basename(file) === 'node_modules' || _path2.default.basename(file) === 'package.json' || _path2.default.basename(file) === 'README.md' || _path2.default.basename(file) === 'desktop' || _path2.default.basename(file) === 'docs' || _path2.default.basename(file) === 'web' || _path2.default.basename(file) === 'package-lock.json' || _path2.default.basename(file) === 'assets' || _path2.default.basename(file) === 'ios' || _path2.default.basename(file) === 'android' || _path2.default.basename(file) === 'cloud' || _path2.default.basename(file) === 'blockchain';
        };

        (0, _recursiveReaddir2.default)(_this.dir, [ignore], function (error, files) {
          if (error) {
            reject(error);
            return;
          }

          _this._files = files.map(function (file) {
            return _path2.default.relative(_this.dir, file);
          });
          resolve(_this._files);
        });
      });
    }

    // start ({ port, light }, cb) {
    //   if (light) {
    //     return this.loadFileList().then(() => ({ files: this.files, port }))
    //   }
    //
    //   return this.loadFileList().then(() => this.startServer({ port }, cb))
    // }

    // startServer ({ port }, cb) {
    //   return new Promise((resolve, reject) => {
    //     try {
    //       process.noDeprecation = true
    //
    //       const dir = path.resolve(this.dir, '.chunky', 'web')
    //       fs.existsSync(dir) && fs.removeSync(dir)
    //       fs.mkdirsSync(dir)
    //
    //       const manifest = loadManifest(this)
    //       const chunks = loadChunks(this)
    //
    //       const root = this.root
    //       const configFile = path.resolve(root, 'node_modules', 'react-dom-chunky', 'packager', 'config.dev.js')
    //       const config = require(configFile)
    //       const setup = config({ dir: this.dir, chunks, config: manifest, root, port })
    //       const compConfig = this.compilerConfig({ dir: this.dir, root, port })
    //
    //       const compiler = webpack(setup)
    //       compiler.plugin('done', (stats) => {
    //         cb && cb(Object.assign({}, { compiled: true, compiling: false }, stats.compilation.errors.length > 0, { errors: stats.compilation.errors }))
    //       })
    //       compiler.plugin('compile', (params) => {
    //         cb && cb(Object.assign({}, { compiled: false, compiling: true }))
    //       })
    //
    //       const server = new WebpackDevServer(compiler, compConfig)
    //       server.listen(port, '0.0.0.0', (error) => {
    //         if (error) {
    //           reject(error)
    //           return
    //         }
    //         resolve({ port, files: this.files })
    //       })
    //     } catch (e) {
    //       reject(e)
    //     }
    //   })
    // }

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
    key: 'fixture',
    get: function get() {
      return this.props.fixture;
    }
  }, {
    key: 'root',
    get: function get() {
      return this.props.root;
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
    key: 'depsRoot',
    get: function get() {
      return this.props.depsRoot;
    }
  }, {
    key: 'dir',
    get: function get() {
      return _path2.default.resolve(this.home, 'products', this.id);
    }
  }, {
    key: 'files',
    get: function get() {
      return this._files;
    }
  }]);

  return Product;
}();

exports.default = Product;