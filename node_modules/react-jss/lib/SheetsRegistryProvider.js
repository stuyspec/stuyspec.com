'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _jss = require('jss');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SheetsRegistryProvider = function (_Component) {
  _inherits(SheetsRegistryProvider, _Component);

  function SheetsRegistryProvider() {
    _classCallCheck(this, SheetsRegistryProvider);

    return _possibleConstructorReturn(this, (SheetsRegistryProvider.__proto__ || Object.getPrototypeOf(SheetsRegistryProvider)).apply(this, arguments));
  }

  _createClass(SheetsRegistryProvider, [{
    key: 'getChildContext',
    value: function getChildContext() {
      return {
        jssSheetsRegistry: this.props.registry
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var children = this.props.children;

      return _react.Children.count(children) > 1 ? _react2['default'].createElement(
        'div',
        null,
        children
      ) : children;
    }
  }]);

  return SheetsRegistryProvider;
}(_react.Component);

SheetsRegistryProvider.propTypes = {
  registry: (0, _propTypes.instanceOf)(_jss.SheetsRegistry).isRequired,
  children: _propTypes.node.isRequired
};
SheetsRegistryProvider.childContextTypes = {
  jssSheetsRegistry: (0, _propTypes.instanceOf)(_jss.SheetsRegistry).isRequired
};
exports['default'] = SheetsRegistryProvider;