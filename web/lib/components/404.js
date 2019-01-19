'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Text = require('./Text');

var _Text2 = _interopRequireDefault(_Text);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NotFoundPage = function NotFoundPage(props) {
  return React.createElement(
    'div',
    { style: { width: '100%', marginTop: '30px' } },
    props && props.notFoundPageText ? React.createElement(_Text2.default, { source: props.notFoundPageText }) : React.createElement('div', null)
  );
};

exports.default = NotFoundPage;