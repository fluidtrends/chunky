'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _generators = require('../generators');

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _Chunk = require('./Chunk');

var _Chunk2 = _interopRequireDefault(_Chunk);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Product = function () {
  function Product(props) {
    _classCallCheck(this, Product);

    this._props = props;
  }

  _createClass(Product, [{
    key: 'create',
    value: function create() {
      if (this.exists) {
        return;
      }

      _fsExtra2.default.mkdirsSync(this.dir);

      var packageData = (0, _generators.generatePackage)({ name: this.name });
      var manifestData = (0, _generators.generateManifest)({ name: this.name });

      (0, _generators.createFile)({ root: this.dir, filepath: 'package.json', data: packageData, json: true });
      (0, _generators.createFile)({ root: this.dir, filepath: 'chunky.json', data: manifestData, json: true });

      (0, _generators.installTemplate)({ root: this.dir, name: 'bananas/personal' });

      (0, _generators.updateChunksIndex)(this.dir);
    }
  }, {
    key: 'addChunk',
    value: function addChunk() {
      var chunksCacheDir = _path2.default.resolve(this.dir);
      // const name = 'main'
      // const chunk = new Chunk({ name })
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
    key: 'root',
    get: function get() {
      return this.props.root;
    }
  }, {
    key: 'dir',
    get: function get() {
      return _path2.default.resolve(this.root, this.id);
    }
  }, {
    key: 'exists',
    get: function get() {
      return _fsExtra2.default.existsSync(this.dir);
    }
  }]);

  return Product;
}();

exports.default = Product;