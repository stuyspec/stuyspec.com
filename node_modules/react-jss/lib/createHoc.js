'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _jss = require('jss');

var _compose = require('./compose');

var _compose2 = _interopRequireDefault(_compose);

var _getDisplayName = require('./getDisplayName');

var _getDisplayName2 = _interopRequireDefault(_getDisplayName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var refNs = 'ref-' + String(Math.random()).substr(2);
var refs = function refs(sheet) {
  return sheet[refNs] || 0;
};
var dec = function dec(sheet) {
  return --sheet[refNs];
};
var inc = function inc(sheet) {
  return ++sheet[refNs];
};

/**
 * Wrap a Component into a JSS Container Component.
 *
 * @param {Jss} jss
 * @param {Component} InnerComponent
 * @param {Object|StyleSheet} stylesOrSheet
 * @param {Object} [options]
 * @return {Component}
 */

exports['default'] = function (jss, InnerComponent, stylesOrSheet) {
  var _class, _temp;

  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  var styles = stylesOrSheet;
  var staticSheet = null;
  var dynamicStyles = void 0;

  // Accept StyleSheet instance.
  if (stylesOrSheet && typeof stylesOrSheet.attach === 'function') {
    staticSheet = stylesOrSheet;
    styles = null;
  }

  var displayName = (0, _getDisplayName2['default'])(InnerComponent);

  if (!options.meta) options.meta = displayName;

  var dynamicSheetOptions = _extends({}, options, {
    meta: options.meta + 'Dynamic',
    link: true
  });

  function ref() {
    if (!staticSheet) {
      staticSheet = jss.createStyleSheet(styles, options);
      dynamicStyles = (0, _compose2['default'])(staticSheet, (0, _jss.getDynamicStyles)(styles));
    }
    if (staticSheet[refNs] === undefined) staticSheet[refNs] = 0;
    if (refs(staticSheet) === 0) staticSheet.attach();
    inc(staticSheet);
    return staticSheet;
  }

  function deref() {
    if (dec(staticSheet) === 0) staticSheet.detach();
  }

  return _temp = _class = function (_Component) {
    _inherits(Jss, _Component);

    function Jss() {
      _classCallCheck(this, Jss);

      return _possibleConstructorReturn(this, (Jss.__proto__ || Object.getPrototypeOf(Jss)).apply(this, arguments));
    }

    _createClass(Jss, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        this.staticSheet = ref();
        if (this.dynamicSheet) this.dynamicSheet.attach();else if (dynamicStyles) {
          this.dynamicSheet = jss.createStyleSheet(dynamicStyles, dynamicSheetOptions).update(this.props).attach();
        }
        var jssSheetsRegistry = this.context.jssSheetsRegistry;

        if (jssSheetsRegistry) jssSheetsRegistry.add(this.staticSheet);
      }
    }, {
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (this.dynamicSheet) {
          this.dynamicSheet.update(nextProps);
        }
      }
    }, {
      key: 'componentWillUpdate',
      value: function componentWillUpdate() {
        if (process.env.NODE_ENV !== 'production') {
          // Support React Hot Loader.
          if (this.staticSheet !== staticSheet) {
            this.staticSheet.detach();
            this.staticSheet = ref();
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        if (this.staticSheet && !staticSheet) {
          this.staticSheet.detach();
          var jssSheetsRegistry = this.context.jssSheetsRegistry;

          if (jssSheetsRegistry) jssSheetsRegistry.remove(this.staticSheet);
        } else deref();
        if (this.dynamicSheet) this.dynamicSheet.detach();
      }
    }, {
      key: 'render',
      value: function render() {
        var sheet = this.dynamicSheet || this.staticSheet;
        return _react2['default'].createElement(InnerComponent, _extends({ sheet: sheet, classes: sheet.classes }, this.props));
      }
    }]);

    return Jss;
  }(_react.Component), _class.InnerComponent = InnerComponent, _class.displayName = 'Jss(' + displayName + ')', _class.contextTypes = {
    jssSheetsRegistry: (0, _propTypes.instanceOf)(_jss.SheetsRegistry)
  }, _class.defaultProps = InnerComponent.defaultProps, _temp;
};