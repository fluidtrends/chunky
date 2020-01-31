"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _redux = require("redux");

var _reduxPromise = _interopRequireDefault(require("redux-promise"));

var _reduxThunk = _interopRequireDefault(require("redux-thunk"));

var _reduxLogger = _interopRequireDefault(require("redux-logger"));

var _reducers = _interopRequireDefault(require("../reducers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// import { composeWithDevTools } from 'remote-redux-devtools'
// Prepare the app middleware for store injection
var middlewareWithLogging = (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxPromise["default"], (0, _reduxLogger["default"])());
var middleware = (0, _redux.applyMiddleware)(_reduxThunk["default"], _reduxPromise["default"]); // Setup the dev tools composer
// const composeEnhancers = composeWithDevTools({
//   name: 'Chunky',
//   hostname: 'localhost',
//   port: 8000,
//   realtime: true
// })
// Create the store from the reducers and middleware

var store = function store(appReducers, options) {
  return (0, _redux.createStore)((0, _reducers["default"])(appReducers), (0, _redux.compose)(options.logging ? middlewareWithLogging : middleware));
}; // Export the store to be used by the entire app


var _default = store;
exports["default"] = _default;