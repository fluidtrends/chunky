'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (component, selectors, actions) {
  return (0, _reactRedux.connect)(mapStateToProps(selectors), mapDispatchToProps(actions))(component);
};

var _reactRedux = require('react-redux');

function mapStateToProps(selectors) {
  return function (state, props) {
    if (!props.chunkName || !state[props.chunkName]) {
      return props;
    }

    var newProps = {};

    var _loop = function _loop(name) {
      var selector = selectors[name];

      if (name === '@') {
        newProps[name] = Object.assign({}, selector);
        return 'continue';
      }

      var selectorProps = function selectorProps(options) {
        return Object.assign(options || {}, { _route: props });
      };
      var result = function result(options) {
        return selector(state, selectorProps(options));
      };
      newProps[name] = result;
    };

    for (var name in selectors) {
      var _ret = _loop(name);

      if (_ret === 'continue') continue;
    }

    return newProps;
  };
}

function mapDispatchToProps(actions) {
  return function (dispatch, props) {
    var newProps = {};

    var _loop2 = function _loop2(action) {
      var operation = actions[action].op;
      var actionProps = function actionProps(options) {
        return Object.assign(options || {}, { _route: props });
      };
      newProps[action] = function (options) {
        return dispatch(operation(actionProps(options)));
      };

      if (action !== 'startOperation') {
        newProps['@' + action] = Object.assign({}, actions[action]);
      }
    };

    for (var action in actions) {
      _loop2(action);
    }

    return newProps;
  };
}