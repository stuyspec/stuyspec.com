'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = jssCompose;

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Set class name.
 *
 * @param {Object} original rule
 * @param {String} compostion class string
 * @return {Boolean} flag, indicating function was successfull or not
 */
function setClass(rule, composition) {
  // Skip falsy values
  if (!composition) return true;

  if (Array.isArray(composition)) {
    for (var index = 0; index < composition.length; index++) {
      var isSetted = setClass(rule, composition[index]);
      if (!isSetted) return false;
    }

    return true;
  }

  if (composition.indexOf(' ') > -1) {
    return setClass(rule, composition.split(' '));
  }

  if (composition[0] === '$') {
    var refRule = rule.options.sheet.getRule(composition.substr(1));

    if (!refRule) {
      (0, _warning2.default)(false, '[JSS] Referenced rule is not defined. \r\n%s', rule);
      return false;
    }
    if (refRule === rule) {
      (0, _warning2.default)(false, '[JSS] Cyclic composition detected. \r\n%s', rule);
      return false;
    }
    setClass(rule, refRule.className);
    return true;
  }

  var container = rule.options.parent;
  rule.className += ' ' + composition;
  container.classes[rule.name] = rule.className;
  return true;
}

/**
 * Convert compose property to additional class, remove property from original styles.
 *
 * @param {Rule} rule
 * @api public
 */
function jssCompose() {
  function onProcessStyle(style, rule) {
    if (!style.composes) return style;
    setClass(rule, style.composes);
    // Remove composes property to prevent infinite loop.
    delete style.composes;
    return style;
  }
  return { onProcessStyle: onProcessStyle };
}