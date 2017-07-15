'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});


var globalRef = typeof window === 'undefined' ? global : window;

var namespace = '__JSS_VERSION_COUNTER__';
if (globalRef[namespace] == null) globalRef[namespace] = 0;
// In case we have more than one JSS version.
var jssCounter = globalRef[namespace]++;
var ruleCounter = 0;

/**
 * Generates unique class names.
 */

exports['default'] = function (rule) {
  return (
    // There is no rule name if `jss.createRule(style)` was used.
    (rule.name || 'jss') + '-' + jssCounter + '-' + ruleCounter++
  );
};