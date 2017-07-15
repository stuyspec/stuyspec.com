'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.jss = exports.SheetsRegistryProvider = exports.SheetsRegistry = undefined;

var cov_2ppr9poys5 = function () {
  var path = '/Users/kof/work/projects/kof/cssinjs/react-jss/src/index.js',
      hash = '065fce9581d3bfda213d0e5478135637240a914d',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/kof/work/projects/kof/cssinjs/react-jss/src/index.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

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