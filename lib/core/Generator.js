'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _urlParse = require('url-parse');

var _urlParse2 = _interopRequireDefault(_urlParse);

var _Container = require('./Container');

var _Container2 = _interopRequireDefault(_Container);

var _data = require('../data');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Generator = function () {
  function Generator(props) {
    _classCallCheck(this, Generator);

    this._props = props;
  }

  _createClass(Generator, [{
    key: 'generateSelectors',
    value: function generateSelectors(chunk, route, routeName, light) {
      if (light) {
        return { '@': { id: chunk.name + '/' + routeName, route: route, routeName: routeName } };
      }

      var hasData = _data.Selectors.common.hasData(chunk.name, 'main');
      var data = _data.Selectors.common.getData(chunk.name);
      var action = _data.Selectors.common.getAction(chunk.name);
      var hasDataError = _data.Selectors.common.hasError(chunk.name, 'main');
      var dataError = _data.Selectors.common.getError(chunk.name);
      var isDataLoaded = _data.Selectors.common.isDone(chunk.name);
      var isDataLoading = _data.Selectors.common.isInProgress(chunk.name);

      return { '@': { id: chunk.name + '/' + routeName, route: route, routeName: routeName }, hasData: hasData, data: data, hasDataError: hasDataError, dataError: dataError, isDataLoaded: isDataLoaded, isDataLoading: isDataLoading, action: action };
    }
  }, {
    key: 'generateAction',
    value: function generateAction(chunk, options) {
      if (!options || !options.provider || !this.props.dataProviders[options.provider]) {
        // All actions must specify an operation and a data provider
        return;
      }

      // Look up the data provider first
      var provider = this.props.dataProviders[options.provider];

      if (!provider) {
        // We want to make sure we have a valid data provider before we move on
        return;
      }

      // Let's build up the operation from the data provider
      var operation = function operation(props) {
        return provider.operation(Object.assign({ props: props }, options));
      };

      // And finally, let's use that operation to generate an action
      return function (props) {
        return _data.Actions.common.asyncAction(options.chunkName + '/' + options.func, function () {
          return operation(props);
        }, Object.assign({ props: props }, options));
      };
    }
  }, {
    key: 'parseOperationFromURI',
    value: function parseOperationFromURI(uri, chunk) {
      var url = new _urlParse2.default(uri, true);

      var type = url.hostname;
      var provider = url.protocol.slice(0, -1).toLowerCase();
      var nodes = url.pathname.split('/').slice(1);
      var options = url.query;
      var flavor = url.hash ? url.hash.substring(1) : 'main';
      var chunkName = provider === 'local' && nodes.length > 0 ? nodes[0] : chunk.name;

      return { type: type, nodes: nodes, options: options, flavor: flavor, provider: provider, chunkName: chunkName };
    }
  }, {
    key: 'generateActions',
    value: function generateActions(chunk, route, routeName, light) {
      if (light || !route || !route.operations || Object.keys(route.operations).length === 0) {
        return {};
      }

      var all = {};

      for (var operationName in route.operations) {
        // Parse the action from the URI
        var operationUri = route.operations[operationName];
        var operationHandlers = {};

        if (Array.isArray(operationUri) && operationUri.length > 1) {
          operationHandlers = operationUri[1];
          operationUri = operationUri[0];
        }

        // Here's our operation now, all parsed
        var operation = Object.assign({ func: operationName, handlers: operationHandlers, routeName: routeName, routeId: chunk.name + '/' + routeName }, this.parseOperationFromURI(operationUri, chunk));

        // Attempt to generate this action
        var generatedAction = this.generateAction(chunk, operation);

        if (generatedAction) {
          // Keep track of it if it was successfully generated
          all[operation.func] = Object.assign({}, { op: generatedAction }, operation, operationHandlers);

          if (Object.keys(all).length === 1) {
            // Let's track this as the initial operation
            all.startOperation = Object.assign({}, { op: generatedAction }, operation, operationHandlers);
          }
        }
      }

      return all;
    }
  }, {
    key: 'generateContainer',
    value: function generateContainer(chunk, route, routeName, light) {
      var actions = Object.assign({}, this.generateActions(chunk, route, routeName, light));
      var selectors = Object.assign({}, this.generateSelectors(chunk, route, routeName, light));

      return (0, _Container2.default)(route.screen, selectors, actions);
    }
  }, {
    key: 'generateReducer',
    value: function generateReducer(chunk) {
      return _data.Reducers.common.asyncReducer(chunk.name);
    }
  }, {
    key: 'props',
    get: function get() {
      return this._props;
    }
  }]);

  return Generator;
}();

exports.default = Generator;