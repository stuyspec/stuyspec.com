'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.jss = exports.SheetsRegistryProvider = exports.SheetsRegistry = undefined;

var _jss = require('jss');

Object.defineProperty(exports, 'SheetsRegistry', {
  enumerable: true,
  get: function get() {
    return _jss.SheetsRegistry;
  }
});

var _SheetsRegistryProvider = require('./SheetsRegistryProvider');

Object.defineProperty(exports, 'SheetsRegistryProvider', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SheetsRegistryProvider)['default'];
  }
});

var _jss2 = require('./jss');

Object.defineProperty(exports, 'jss', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_jss2)['default'];
  }
});

var _createInjectSheet = require('./createInjectSheet');

var _createInjectSheet2 = _interopRequireDefault(_createInjectSheet);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports.create = _createInjectSheet2['default'];

/**
 * Exports injectSheet function as default.
 * Returns a function which needs to be invoked with a Component.
 *
 * `injectSheet(styles, [options])(Component)`
 *
 * @param {Object} styles
 * @param {Object} [options]
 * @return {Function}
 * @api public
 */

exports['default'] = (0, _createInjectSheet2['default'])();