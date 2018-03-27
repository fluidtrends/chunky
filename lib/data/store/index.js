'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _redux = require('redux');

var _reduxPromise = require('redux-promise');

var _reduxPromise2 = _interopRequireDefault(_reduxPromise);

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _reduxLogger = require('redux-logger');

var _reduxLogger2 = _interopRequireDefault(_reduxLogger);

var _reducers = require('../reducers');

var _reducers2 = _interopRequireDefault(_reducers);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Prepare the app middleware for store injection

// import { composeWithDevTools } from 'remote-redux-devtools'
var middlewareWithLogging = (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxPromise2.default, (0, _reduxLogger2.default)());
var middleware = (0, _redux.applyMiddleware)(_reduxThunk2.default, _reduxPromise2.default);

// Setup the dev tools composer
// const composeEnhancers = composeWithDevTools({
//   name: 'Chunky',
//   hostname: 'localhost',
//   port: 8000,
//   realtime: true
// })

// Create the store from the reducers and middleware
var store = function store(appReducers, options) {
  return (0, _redux.createStore)((0, _reducers2.default)(appReducers), (0, _redux.compose)(options.logging ? middlewareWithLogging : middleware));
};

// Export the store to be used by the entire app
exports.default = store;