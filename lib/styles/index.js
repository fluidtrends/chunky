'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Colors = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.styleColor = styleColor;

var _colors = require('./colors');

var Colors = _interopRequireWildcard(_colors);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.Colors = Colors;
function styleColor(id) {
  var _id$split = id.split('.'),
      _id$split2 = _slicedToArray(_id$split, 3),
      type = _id$split2[0],
      name = _id$split2[1],
      shade = _id$split2[2];

  if (type.toLowerCase() === 'material') {
    return Colors.MaterialColors[name][shade];
  }

  return Colors.MaterialColors.grey[200];
}