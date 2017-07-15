"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_2oqmw1gmen = function () {
  var path = "/Users/kof/work/projects/kof/cssinjs/react-jss/src/compose.js",
      hash = "787e316664cb7df29a356120253565652b44cab7",
      global = new Function('return this')(),
      gcv = "__coverage__",
      coverageData = {
    path: "/Users/kof/work/projects/kof/cssinjs/react-jss/src/compose.js",
    statementMap: {
      "0": {
        start: {
          line: 10,
          column: 2
        },
        end: {
          line: 14,
          column: 3
        }
      },
      "1": {
        start: {
          line: 11,
          column: 22
        },
        end: {
          line: 11,
          column: 47
        }
      },
      "2": {
        start: {
          line: 12,
          column: 4
        },
        end: {
          line: 12,
          column: 25
        }
      },
      "3": {
        start: {
          line: 12,
          column: 20
        },
        end: {
          line: 12,
          column: 25
        }
      },
      "4": {
        start: {
          line: 13,
          column: 4
        },
        end: {
          line: 13,
          column: 57
        }
      },
      "5": {
        start: {
          line: 16,
          column: 2
        },
        end: {
          line: 23,
          column: 3
        }
      },
      "6": {
        start: {
          line: 17,
          column: 4
        },
        end: {
          line: 22,
          column: 5
        }
      },
      "7": {
        start: {
          line: 18,
          column: 24
        },
        end: {
          line: 18,
          column: 36
        }
      },
      "8": {
        start: {
          line: 19,
          column: 6
        },
        end: {
          line: 21,
          column: 7
        }
      },
      "9": {
        start: {
          line: 20,
          column: 8
        },
        end: {
          line: 20,
          column: 60
        }
      },
      "10": {
        start: {
          line: 25,
          column: 2
        },
        end: {
          line: 25,
          column: 15
        }
      }
    },
    fnMap: {
      "0": {
        name: "(anonymous_0)",
        decl: {
          start: {
            line: 9,
            column: 15
          },
          end: {
            line: 9,
            column: 16
          }
        },
        loc: {
          start: {
            line: 9,
            column: 40
          },
          end: {
            line: 26,
            column: 1
          }
        }
      }
    },
    branchMap: {
      "0": {
        loc: {
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 12,
            column: 25
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 12,
            column: 25
          }
        }, {
          start: {
            line: 12,
            column: 4
          },
          end: {
            line: 12,
            column: 25
          }
        }]
      },
      "1": {
        loc: {
          start: {
            line: 16,
            column: 2
          },
          end: {
            line: 23,
            column: 3
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 16,
            column: 2
          },
          end: {
            line: 23,
            column: 3
          }
        }, {
          start: {
            line: 16,
            column: 2
          },
          end: {
            line: 23,
            column: 3
          }
        }]
      },
      "2": {
        loc: {
          start: {
            line: 19,
            column: 6
          },
          end: {
            line: 21,
            column: 7
          }
        },
        type: "if",
        locations: [{
          start: {
            line: 19,
            column: 6
          },
          end: {
            line: 21,
            column: 7
          }
        }, {
          start: {
            line: 19,
            column: 6
          },
          end: {
            line: 21,
            column: 7
          }
        }]
      }
    },
    s: {
      "0": 0,
      "1": 0,
      "2": 0,
      "3": 0,
      "4": 0,
      "5": 0,
      "6": 0,
      "7": 0,
      "8": 0,
      "9": 0,
      "10": 0
    },
    f: {
      "0": 0
    },
    b: {
      "0": [0, 0],
      "1": [0, 0],
      "2": [0, 0]
    },
    _coverageSchema: "332fd63041d2c1bcb487cc26dd0d5f7d97098a6c"
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Adds `composes` property to each top level rule
 * in order to have a composed class name for dynamic style sheets.
 *
 * @param {StyleSheet} staticSheet
 * @param {Object} styles
 * @return {Object|null}
 */
exports["default"] = function (staticSheet, styles) {
  ++cov_2oqmw1gmen.f[0];
  ++cov_2oqmw1gmen.s[0];

  for (var name in styles) {
    var className = (++cov_2oqmw1gmen.s[1], staticSheet.classes[name]);
    ++cov_2oqmw1gmen.s[2];
    if (!className) {
        ++cov_2oqmw1gmen.b[0][0];
        ++cov_2oqmw1gmen.s[3];
        break;
      } else {
      ++cov_2oqmw1gmen.b[0][1];
    }++cov_2oqmw1gmen.s[4];
    styles[name] = _extends({}, styles[name], { composes: className });
  }

  ++cov_2oqmw1gmen.s[5];
  if (styles) {
    ++cov_2oqmw1gmen.b[1][0];
    ++cov_2oqmw1gmen.s[6];

    for (var _name in staticSheet.classes) {
      var _className = (++cov_2oqmw1gmen.s[7], styles[_name]);
      ++cov_2oqmw1gmen.s[8];
      if (!_className) {
        ++cov_2oqmw1gmen.b[2][0];
        ++cov_2oqmw1gmen.s[9];

        styles[_name] = { composes: staticSheet.classes[_name] };
      } else {
        ++cov_2oqmw1gmen.b[2][1];
      }
    }
  } else {
    ++cov_2oqmw1gmen.b[1][1];
  }

  ++cov_2oqmw1gmen.s[10];
  return styles;
};