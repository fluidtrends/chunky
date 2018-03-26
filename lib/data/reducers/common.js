'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var asyncReducer = exports.asyncReducer = function asyncReducer(name) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    if (!action || Object.keys(action).length === 0 || !action.type) {
      // We don't tolerate empty actions
      return state;
    }

    // Let's see what kind of action this is

    var _action$type$split = action.type.split('/'),
        _action$type$split2 = _slicedToArray(_action$type$split, 4),
        source = _action$type$split2[0],
        actionState = _action$type$split2[1],
        chunkName = _action$type$split2[2],
        actionName = _action$type$split2[3];

    if (source.toLowerCase() != '@@chunky') {
      // We only recognize framework actions
      return state;
    }

    if (!chunkName || name.toLowerCase() != chunkName.toLowerCase()) {
      // We want to ignore foreign actions
      return state;
    }

    // Figure out the flavor
    var flavor = !action.flavor ? ['main'] : action.flavor.split('/') || ['main'];
    var newErrorFlavor = flavor.length > 1 ? _defineProperty({}, flavor[1], action.error) : action.error;
    var newDataFlavor = flavor.length > 1 ? _defineProperty({}, flavor[1], action.data) : action.data;

    // The action timestamp
    var timestamp = action.timestamp;

    // The data provider
    var provider = action.provider;

    // Let's work on the new state
    var newState = { flavor: action.flavor, timestamp: timestamp, provider: provider, inProgress: false, done: true, action: actionName };
    var data = Object.assign({}, state.data);
    var error = Object.assign({}, state.error);

    switch (actionState.toLowerCase()) {
      case 'start':
        return Object.assign({}, newState, { inProgress: true, done: false, data: data, error: error });

      case 'error':
        if (newErrorFlavor) {
          error[flavor[0]] = newErrorFlavor;
        }
        return Object.assign({}, newState, Object.keys(error).length > 0 ? { error: error } : {});

      case 'ok':
        if (newDataFlavor) {
          data[flavor[0]] = newDataFlavor;
        }
        return Object.assign({}, newState, Object.keys(data).length > 0 ? { data: data } : {});

      default:
    }

    return state;
  };
};