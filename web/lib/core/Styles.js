"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _main = function _main(_) {
  return {
    container: {
      backgroundColor: '#FFFFFF'
    },
    component: {
      backgroundColor: '#FFFFFF',
      padding: 0,
      margin: 0,
      display: 'flex',
      flex: 1,
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      color: '#455A64'
    }
  };
};

var _default = function _default(props) {
  return {
    main: _main(props)
  };
};

exports["default"] = _default;