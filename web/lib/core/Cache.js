'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = function () {
  function Cache(props) {
    _classCallCheck(this, Cache);

    this._images = {};
    this._timestamp = Date.now();
    this._props = Object.assign({}, props);
    this.loadContext();
  }

  _createClass(Cache, [{
    key: 'loadDesktopContext',
    value: function loadDesktopContext() {
      this._context = function (name) {
        return { placeholder: '../../../../assets/' + name, images: [{ path: '../../../../assets/' + name }, { path: '../../../../assets/' + name }] };
      };
    }
  }, {
    key: 'loadContext',
    value: function loadContext() {
      return this.loadDesktopContext();
    }
  }, {
    key: 'hasImage',
    value: function hasImage(name) {
      return this.images[name] !== undefined;
    }
  }, {
    key: 'cacheImage',
    value: function cacheImage(id) {
      var name = './' + id;
      var timestamp = Date.now();
      var data = this.context(name, true);
      var placeholder = data.placeholder;
      var small = data.images[0].path;
      var large = data.images[1].path;
      this._images[id] = { data: data, id: id, timestamp: timestamp, small: small, large: large, placeholder: placeholder };
    }
  }, {
    key: 'image',
    value: function image(name) {
      if (!this.hasImage(name)) {
        this.cacheImage(name);
      }

      return this.images[name];
    }
  }, {
    key: 'props',
    get: function get() {
      return this._props;
    }
  }, {
    key: 'isDesktop',
    get: function get() {
      return this.props.desktop;
    }
  }, {
    key: 'isRuntime',
    get: function get() {
      return typeof window !== 'undefined' && typeof document !== 'undefined';
    }
  }, {
    key: 'context',
    get: function get() {
      return this._context;
    }
  }, {
    key: 'images',
    get: function get() {
      return this._images;
    }
  }]);

  return Cache;
}();

exports.default = Cache;