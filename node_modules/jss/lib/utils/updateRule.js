'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports['default'] = function (rule, data, RulesContainer) {
  if (rule.type === 'regular') {
    for (var prop in rule.style) {
      var value = rule.style[prop];
      if (typeof value === 'function') {
        rule.prop(prop, value(data));
      }
    }
  } else if (rule.rules instanceof RulesContainer) {
    rule.rules.update(data);
  }
};