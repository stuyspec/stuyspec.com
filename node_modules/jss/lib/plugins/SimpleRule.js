'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SimpleRule = function () {
  function SimpleRule(name, value, options) {
    _classCallCheck(this, SimpleRule);

    this.type = 'simple';

    this.name = name;
    this.value = value;
    this.options = options;
  }

  /**
   * Generates a CSS string.
   */


  _createClass(SimpleRule, [{
    key: 'toString',
    value: function toString() {
      if (Array.isArray(this.value)) {
        var str = '';
        for (var index = 0; index < this.value.length; index++) {
          str += this.name + ' ' + this.value[index] + ';';
          if (this.value[index + 1]) str += '\n';
        }
        return str;
      }

      return this.name + ' ' + this.value + ';';
    }
  }]);

  return SimpleRule;
}();

exports['default'] = SimpleRule;