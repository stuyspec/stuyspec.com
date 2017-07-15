'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = createRule;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _RegularRule = require('../plugins/RegularRule');

var _RegularRule2 = _interopRequireDefault(_RegularRule);

var _cloneStyle = require('../utils/cloneStyle');

var _cloneStyle2 = _interopRequireDefault(_cloneStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

/**
 * Create a rule instance.
 */
function createRule(name, decl, options) {
  var jss = options.jss;

  var declCopy = (0, _cloneStyle2['default'])(decl);

  if (jss) {
    var rule = jss.plugins.onCreateRule(name, declCopy, options);
    if (rule) return rule;
  }

  // It is an at-rule and it has no instance.
  if (name && name[0] === '@') {
    (0, _warning2['default'])(false, '[JSS] Unknown at-rule %s', name);
  }

  return new _RegularRule2['default'](name, declCopy, options);
}