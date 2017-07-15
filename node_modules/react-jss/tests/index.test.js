'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _expect = require('expect.js');

var _expect2 = _interopRequireDefault(_expect);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDeepForceUpdate = require('react-deep-force-update');

var _reactDeepForceUpdate2 = _interopRequireDefault(_reactDeepForceUpdate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint-disable global-require, react/prop-types */

var node = void 0;
var jss = void 0;
var sheets = void 0;
var createJss = void 0;
var injectSheet = void 0;
var createInjectSheet = void 0;
var reactJss = void 0;
var SheetsRegistry = void 0;
var SheetsRegistryProvider = void 0;

loadModules();

function reloadModules() {
  Object.keys(require.cache).forEach(function (key) {
    return delete require.cache[key];
  });
  loadModules();
}

function loadModules() {
  var jssModule = require('jss');
  jss = jssModule['default'];
  sheets = jssModule.sheets;
  createJss = jssModule.create;

  var reactJssModule = require('./');
  injectSheet = reactJssModule['default'];
  createInjectSheet = reactJssModule.create;
  reactJss = reactJssModule.jss;
  SheetsRegistry = reactJssModule.SheetsRegistry;
  SheetsRegistryProvider = reactJssModule.SheetsRegistryProvider;
}

function reset() {
  (0, _reactDom.unmountComponentAtNode)(node);
  reloadModules();
  node.parentNode.removeChild(node);
}

describe('react-jss', function () {
  beforeEach(function () {
    node = document.body.appendChild(document.createElement('div'));
  });
  afterEach(reset);

  describe('.create()', function () {
    var localInjectSheet = void 0;
    var localJss = void 0;

    beforeEach(function () {
      localJss = createJss();
      localInjectSheet = createInjectSheet(localJss);
    });

    it('should return a function', function () {
      (0, _expect2['default'])(injectSheet).to.be.a(Function);
    });

    it('should use passed jss', function () {
      var passedJss = void 0;
      var InnerComponent = function InnerComponent(_ref) {
        var sheet = _ref.sheet;

        passedJss = sheet.options.jss;
        return null;
      };
      var Component = localInjectSheet()(InnerComponent);
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(passedJss).to.be(localJss);
    });
  });

  describe('global jss instance', function () {
    it('should return a function', function () {
      (0, _expect2['default'])(injectSheet).to.be.a(Function);
    });

    it('should be available', function () {
      (0, _expect2['default'])(reactJss).to.be.an(jss.constructor);
    });
  });

  describe('.injectSheet()', function () {
    var Component = void 0;

    beforeEach(function () {
      Component = injectSheet({
        button: { color: 'red' }
      })();
    });

    it('should attach and detach a sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should reuse one sheet for 2 elements and detach sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(Component, null),
        _react2['default'].createElement(Component, null)
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });
  });

  describe('.injectSheet() classes prop', function () {
    var passedClasses = void 0;
    var Component = void 0;

    beforeEach(function () {
      var InnerComponent = function InnerComponent(_ref2) {
        var classes = _ref2.classes;

        passedClasses = classes;
        return null;
      };
      Component = injectSheet({
        button: { color: 'red' }
      })(InnerComponent);
    });

    it('should inject classes map as a prop', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(passedClasses).to.only.have.keys(['button']);
    });

    it('should not overwrite existing classes property', function () {
      var classes = 'classes prop';
      (0, _reactDom.render)(_react2['default'].createElement(Component, { classes: classes }), node);
      (0, _expect2['default'])(passedClasses).to.equal(classes);
    });
  });

  describe('.injectSheet() preserving source order', function () {
    var ComponentA = void 0;
    var ComponentB = void 0;
    var ComponentC = void 0;

    beforeEach(function () {
      ComponentA = injectSheet({
        button: { color: 'red' }
      })();
      ComponentB = injectSheet({
        button: { color: 'blue' }
      })();
      ComponentC = injectSheet({
        button: { color: 'green' }
      }, { index: 1234 })();
    });

    it('should provide a default index in ascending order', function () {
      (0, _reactDom.render)(_react2['default'].createElement(ComponentA, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexA = sheets.registry[0].options.index;
      sheets.reset();
      (0, _reactDom.render)(_react2['default'].createElement(ComponentB, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexB = sheets.registry[0].options.index;

      (0, _expect2['default'])(indexA).to.be.lessThan(0);
      (0, _expect2['default'])(indexB).to.be.lessThan(0);
      (0, _expect2['default'])(indexA).to.be.lessThan(indexB);
    });

    it('should not be affected by rendering order', function () {
      (0, _reactDom.render)(_react2['default'].createElement(ComponentB, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexB = sheets.registry[0].options.index;
      sheets.reset();
      (0, _reactDom.render)(_react2['default'].createElement(ComponentA, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexA = sheets.registry[0].options.index;

      (0, _expect2['default'])(indexA).to.be.lessThan(0);
      (0, _expect2['default'])(indexB).to.be.lessThan(0);
      (0, _expect2['default'])(indexA).to.be.lessThan(indexB);
    });

    it('should keep custom index', function () {
      (0, _reactDom.render)(_react2['default'].createElement(ComponentC, null), node);
      (0, _expect2['default'])(sheets.registry.length).to.equal(1);
      var indexC = sheets.registry[0].options.index;
      (0, _expect2['default'])(indexC).to.equal(1234);
    });
  });

  describe('.injectSheet() without a component for global styles', function () {
    var Component = void 0;

    beforeEach(function () {
      Component = injectSheet({
        button: { color: 'red' }
      })();
    });

    it('should attach and detach a sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should render children', function () {
      var isRendered = true;
      var ChildComponent = function ChildComponent() {
        isRendered = true;
        return null;
      };
      (0, _reactDom.render)(_react2['default'].createElement(
        Component,
        null,
        _react2['default'].createElement(ChildComponent, null)
      ), node);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(isRendered).to.be(true);
    });
  });

  describe('.injectSheet() hot reloading', function () {
    function simulateHotReloading(container, TargetClass, SourceClass) {
      // Crude imitation of hot reloading that does the job
      Object.getOwnPropertyNames(SourceClass.prototype).filter(function (key) {
        return typeof SourceClass.prototype[key] === 'function';
      }).forEach(function (key) {
        if (key !== 'render' && key !== 'constructor') {
          TargetClass.prototype[key] = SourceClass.prototype[key];
        }
      });

      (0, _reactDeepForceUpdate2['default'])(container);
    }

    var ComponentA = void 0;
    var ComponentB = void 0;
    var ComponentC = void 0;

    beforeEach(function () {
      ComponentA = injectSheet({
        button: { color: 'red' }
      })(function () {
        return null;
      });

      ComponentB = injectSheet({
        button: { color: 'green' }
      })(function () {
        return null;
      });

      ComponentC = injectSheet({
        button: { color: 'blue' }
      })(function () {
        return null;
      });
    });

    it('should hot reload component and attach new sheets', function () {
      var container = (0, _reactDom.render)(_react2['default'].createElement(ComponentA, null), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _expect2['default'])(document.querySelectorAll('style')[0].innerHTML).to.contain('color: red');

      simulateHotReloading(container, ComponentA, ComponentB);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _expect2['default'])(document.querySelectorAll('style')[0].innerHTML).to.contain('color: green');

      simulateHotReloading(container, ComponentA, ComponentC);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _expect2['default'])(document.querySelectorAll('style')[0].innerHTML).to.contain('color: blue');
    });

    it('should properly detach sheets on hot reloaded component', function () {
      // eslint-disable-next-line react/prefer-stateless-function
      var AppContainer = function (_React$Component) {
        _inherits(AppContainer, _React$Component);

        function AppContainer() {
          _classCallCheck(this, AppContainer);

          return _possibleConstructorReturn(this, (AppContainer.__proto__ || Object.getPrototypeOf(AppContainer)).apply(this, arguments));
        }

        _createClass(AppContainer, [{
          key: 'render',
          value: function render() {
            return _react2['default'].createElement(ComponentA, _extends({}, this.props, {
              key: Math.random() // Require children to unmount on every render
            }));
          }
        }]);

        return AppContainer;
      }(_react2['default'].Component);

      var container = (0, _reactDom.render)(_react2['default'].createElement(AppContainer, null), node);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _expect2['default'])(document.querySelectorAll('style')[0].innerHTML).to.contain('color: red');

      simulateHotReloading(container, ComponentA, ComponentB);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _expect2['default'])(document.querySelectorAll('style')[0].innerHTML).to.contain('color: green');

      simulateHotReloading(container, ComponentA, ComponentC);

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
      (0, _expect2['default'])(document.querySelectorAll('style')[0].innerHTML).to.contain('color: blue');
    });
  });

  describe('.injectSheet() with StyleSheet arg', function () {
    describe('accept StyleSheet', function () {
      var Component = void 0;

      beforeEach(function () {
        var sheet = reactJss.createStyleSheet({ a: { color: 'red' } });
        Component = injectSheet(sheet)();
      });

      it('should attach and detach a sheet', function () {
        (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
        (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
        (0, _reactDom.unmountComponentAtNode)(node);
        (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
      });
    });

    describe('share StyleSheet', function () {
      var Component1 = void 0;
      var Component2 = void 0;

      beforeEach(function () {
        var sheet = reactJss.createStyleSheet({ a: { color: 'red' } });
        Component1 = injectSheet(sheet)();
        Component2 = injectSheet(sheet)();
      });

      it('should not detach sheet if it is used in another mounted component', function () {
        var node2 = document.body.appendChild(document.createElement('div'));
        (0, _reactDom.render)(_react2['default'].createElement(Component1, null), node);
        (0, _reactDom.render)(_react2['default'].createElement(Component2, null), node2);
        (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
        (0, _reactDom.unmountComponentAtNode)(node);
        (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(1);
        (0, _reactDom.unmountComponentAtNode)(node2);
        (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
      });
    });
  });

  describe('override sheet prop', function () {
    var Component = void 0;
    var receivedSheet = void 0;
    var mock = {};

    beforeEach(function () {
      var InnerComponent = function InnerComponent(props) {
        receivedSheet = props.sheet;
        return null;
      };
      Component = injectSheet()(InnerComponent);
    });

    it('should be able to override the sheet prop', function () {
      var Parent = function Parent() {
        return _react2['default'].createElement(Component, { sheet: mock });
      };
      (0, _reactDom.render)(_react2['default'].createElement(Parent, null), node);
      (0, _expect2['default'])(receivedSheet).to.be(mock);
    });
  });

  describe('with SheetsRegistryProvider', function () {
    it('should add style sheets to the registry from context', function () {
      var customSheets = new SheetsRegistry();
      var ComponentA = injectSheet({
        button: { color: 'red' }
      })();
      var ComponentB = injectSheet({
        button: { color: 'blue' }
      })();

      (0, _reactDom.render)(_react2['default'].createElement(
        SheetsRegistryProvider,
        { registry: customSheets },
        _react2['default'].createElement(ComponentA, null),
        _react2['default'].createElement(ComponentB, null)
      ), node);

      (0, _expect2['default'])(customSheets.registry.length).to.equal(2);
    });
  });

  describe('access inner component', function () {
    it('should be exposed using "InnerComponent" property', function () {
      var ComponentOuter = injectSheet({
        button: { color: 'red' }
      })();
      (0, _expect2['default'])(ComponentOuter.InnerComponent).to.be.a(Function);
    });
  });

  describe('function values', function () {
    var color = 'rgb(0, 0, 0)';
    var Component = void 0;

    beforeEach(function () {
      var InnerComponent = function InnerComponent(_ref3) {
        var classes = _ref3.classes;
        return _react2['default'].createElement('div', { className: classes.button + ' ' + classes.left });
      };

      Component = injectSheet({
        left: {
          float: 'left'
        },
        button: {
          color: color,
          height: function height(_ref4) {
            var _ref4$height = _ref4.height;

            var _height = _ref4$height === undefined ? 1 : _ref4$height;

            return _height + 'px';
          }
        }
      })(InnerComponent);
    });

    it('should attach and detach a sheet', function () {
      (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(2);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should reuse static sheet, but generate separate dynamic once', function () {
      (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(Component, null),
        _react2['default'].createElement(Component, null)
      ), node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(3);
      (0, _reactDom.unmountComponentAtNode)(node);
      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(0);
    });

    it('should use the default value', function () {
      var node0 = (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      var style0 = getComputedStyle((0, _reactDom.findDOMNode)(node0));
      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('1px');
    });

    it('should have dynamic and static styles', function () {
      var node0 = (0, _reactDom.render)(_react2['default'].createElement(Component, null), node);
      var style0 = getComputedStyle((0, _reactDom.findDOMNode)(node0));
      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.float).to.be('left');
      (0, _expect2['default'])(style0.height).to.be('1px');
    });

    it('should generate different dynamic values', function () {
      var componentNode = (0, _reactDom.render)(_react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(Component, { height: 10 }),
        _react2['default'].createElement(Component, { height: 20 })
      ), node);

      var _componentNode$childr = _slicedToArray(componentNode.children, 2);

      var node0 = _componentNode$childr[0];
      var node1 = _componentNode$childr[1];

      var style0 = getComputedStyle(node0);
      var style1 = getComputedStyle(node1);

      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('10px');
      (0, _expect2['default'])(style1.color).to.be(color);
      (0, _expect2['default'])(style1.height).to.be('20px');
    });

    it('should update dynamic values', function () {
      /* eslint-disable react/no-multi-comp, react/prefer-stateless-function */
      var Container = function (_PureComponent) {
        _inherits(Container, _PureComponent);

        function Container() {
          _classCallCheck(this, Container);

          return _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).apply(this, arguments));
        }

        _createClass(Container, [{
          key: 'render',
          value: function render() {
            var height = this.props.height;

            return _react2['default'].createElement(
              'div',
              null,
              _react2['default'].createElement(Component, { height: height }),
              _react2['default'].createElement(Component, { height: height * 2 })
            );
          }
        }]);

        return Container;
      }(_react.PureComponent);
      /* eslint-enable */

      var component = (0, _reactDom.render)(_react2['default'].createElement(Container, { height: 10 }), node);
      var componentNode = (0, _reactDom.findDOMNode)(component);

      var _componentNode$childr2 = _slicedToArray(componentNode.children, 2);

      var node0 = _componentNode$childr2[0];
      var node1 = _componentNode$childr2[1];

      var style0 = getComputedStyle(node0);
      var style1 = getComputedStyle(node1);

      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('10px');
      (0, _expect2['default'])(style1.color).to.be(color);
      (0, _expect2['default'])(style1.height).to.be('20px');

      (0, _reactDom.render)(_react2['default'].createElement(Container, { height: 20 }), node);

      (0, _expect2['default'])(style0.color).to.be(color);
      (0, _expect2['default'])(style0.height).to.be('20px');
      (0, _expect2['default'])(style1.color).to.be(color);
      (0, _expect2['default'])(style1.height).to.be('40px');

      (0, _expect2['default'])(document.querySelectorAll('style').length).to.be(3);
    });

    it('should use the default props', function () {
      var styles = {
        a: {
          color: function color(props) {
            return props.color;
          }
        }
      };
      var InnerComponent = function InnerComponent(_ref5) {
        var classes = _ref5.classes;
        return _react2['default'].createElement('span', { className: classes.a });
      };
      InnerComponent.defaultProps = {
        color: 'rgb(255, 0, 0)'
      };
      var StyledComponent = injectSheet(styles)(InnerComponent);

      var node0 = (0, _reactDom.render)(_react2['default'].createElement(StyledComponent, null), node);
      var style0 = getComputedStyle((0, _reactDom.findDOMNode)(node0));
      (0, _expect2['default'])(style0.color).to.be('rgb(255, 0, 0)');
    });
  });
});