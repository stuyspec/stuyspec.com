'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1sn5y1jxjg = function () {
  var path = '/Users/kof/work/projects/kof/cssinjs/react-jss/src/getDisplayName.js',
      hash = '2799a209b5a27fcd979b38ce2e6f98b4e38128fe',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/kof/work/projects/kof/cssinjs/react-jss/src/getDisplayName.js',
    statementMap: {
      '0': {
        start: {
          line: 1,
          column: 28
        },
        end: {
          line: 1,
          column: 82
        }
      }
    },
    fnMap: {
      '0': {
        name: '(anonymous_0)',
        decl: {
          start: {
            line: 1,
            column: 15
          },
          end: {
            line: 1,
            column: 16
          }
        },
        loc: {
          start: {
            line: 1,
            column: 28
          },
          end: {
            line: 1,
            column: 82
          }
        }
      }
    },
    branchMap: {
      '0': {
        loc: {
          start: {
            line: 1,
            column: 28
          },
          end: {
            line: 1,
            column: 82
          }
        },
        type: 'binary-expr',
        locations: [{
          start: {
            line: 1,
            column: 28
          },
          end: {
            line: 1,
            column: 49
          }
        }, {
          start: {
            line: 1,
            column: 53
          },
          end: {
            line: 1,
            column: 67
          }
        }, {
          start: {
            line: 1,
            column: 71
          },
          end: {
            line: 1,
            column: 82
          }
        }]
      }
    },
    s: {
      '0': 0
    },
    f: {
      '0': 0
    },
    b: {
      '0': [0, 0, 0]
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

exports['default'] = function (Component) {
  ++cov_1sn5y1jxjg.f[0];
  ++cov_1sn5y1jxjg.s[0];
  return (++cov_1sn5y1jxjg.b[0][0], Component.displayName) || (++cov_1sn5y1jxjg.b[0][1], Component.name) || (++cov_1sn5y1jxjg.b[0][2], 'Component');
};