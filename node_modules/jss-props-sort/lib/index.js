'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = jssPropsSort;
/**
 * Sort props by length.
 *
 * @param {Rule} rule
 * @api public
 */
function jssPropsSort() {
  function sort(prop0, prop1) {
    return prop0.length - prop1.length;
  }

  function onProcessStyle(style, rule) {
    if (rule.type !== 'regular') return style;

    var newStyle = {};
    var props = Object.keys(style).sort(sort);
    for (var prop in props) {
      newStyle[props[prop]] = style[props[prop]];
    }
    return newStyle;
  }

  return { onProcessStyle: onProcessStyle };
}