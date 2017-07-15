'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.create = exports.sheets = exports.RulesContainer = exports.SheetsRegistry = exports.getDynamicStyles = undefined;

var _Jss = require('./Jss');

var _Jss2 = _interopRequireDefault(_Jss);

var _SheetsRegistry = require('./SheetsRegistry');

var _SheetsRegistry2 = _interopRequireDefault(_SheetsRegistry);

var _RulesContainer = require('./RulesContainer');

var _RulesContainer2 = _interopRequireDefault(_RulesContainer);

var _sheets = require('./sheets');

var _sheets2 = _interopRequireDefault(_sheets);

var _getDynamicStyles = require('./utils/getDynamicStyles');

var _getDynamicStyles2 = _interopRequireDefault(_getDynamicStyles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Extracts a styles object with only rules that contain function values.
 */
exports.getDynamicStyles = _getDynamicStyles2['default'];

/**
 * SheetsRegistry for SSR.
 */

/**
 * A better abstraction over CSS.
 *
 * @copyright Oleg Slobodskoi 2014-present
 * @website https://github.com/cssinjs/jss
 * @license MIT
 */

exports.SheetsRegistry = _SheetsRegistry2['default'];

/**
 * RulesContainer for plugins.
 */

exports.RulesContainer = _RulesContainer2['default'];

/**
 * Default global SheetsRegistry instance.
 */

exports.sheets = _sheets2['default'];

/**
 * Creates a new instance of Jss.
 */

var create = exports.create = function create(options) {
  return new _Jss2['default'](options);
};

/**
 * A global Jss instance.
 */
exports['default'] = create();