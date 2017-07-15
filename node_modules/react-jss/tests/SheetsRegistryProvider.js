'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1ztx159rcw = function () {
  var path = '/Users/kof/work/projects/kof/cssinjs/react-jss/src/SheetsRegistryProvider.js',
      hash = 'fa0974fcedaa2a7d405b85b2ff4f22339d4d3ebc',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/kof/work/projects/kof/cssinjs/react-jss/src/SheetsRegistryProvider.js',
    statementMap: {
      '0': {
        start: {
          line: 16,
          column: 4
        },
        end: {
          line: 18,
          column: 5
        }
      },
      '1': {
        start: {
          line: 22,
          column: 23
        },
        end: {
          line: 22,
          column: 33
        }
      },
      '2': {
        start: {
          line: 23,
          column: 4
        },
        end: {
          line: 23,
          column: 74
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 15,
            column: 2
          },
          end: {
            line: 15,
            column: 3
          }
        },
        loc: {
          start: {
            line: 15,
            column: 20
          },
          end: {
            line: 19,
            column: 3
          }
        }
      },
      '1': {
        name: '(anonymous_1)',
        decl: {
          start: {
            line: 21,
            column: 2
          },
          end: {
            line: 21,
            column: 3
          }
        },
        loc: {
          start: {
            line: 21,
            column: 11
          },
          end: {
            line: 24,
            column: 3
          }
        }
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 23,
            column: 11
          },
          end: {
            line: 23,
            column: 74
          }
        },
        type: 'cond-expr',
        locations: [{
          start: {
            line: 23,
            column: 42
          },
          end: {
            line: 23,
            column: 63
          }
        }, {
          start: {
            line: 23,
            column: 66
          },
          end: {
            line: 23,
            column: 74
          }
        }]
      }
    },
    s: {
      '0': 0,
      '1': 0,
      '2': 0
    },
    f: {
      '0': 0,
      '1': 0
    },
    b: {
      '0': [0, 0]
    },
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

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
      ++cov_1ztx159rcw.f[0];
      ++cov_1ztx159rcw.s[0];

      return {
        jssSheetsRegistry: this.props.registry
      };
    }
  }, {
    key: 'render',
    value: function render() {
      ++cov_1ztx159rcw.f[1];

      var _ref = (++cov_1ztx159rcw.s[1], this.props);

      var children = _ref.children;
      ++cov_1ztx159rcw.s[2];

      return _react.Children.count(children) > 1 ? (++cov_1ztx159rcw.b[0][0], _react2['default'].createElement(
        'div',
        null,
        children
      )) : (++cov_1ztx159rcw.b[0][1], children);
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