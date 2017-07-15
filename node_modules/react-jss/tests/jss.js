'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var cov_1257ueduco = function () {
  var path = '/Users/kof/work/projects/kof/cssinjs/react-jss/src/jss.js',
      hash = '7e834f8b6fde92b1899488c5936c3bcfb5e79615',
      global = new Function('return this')(),
      gcv = '__coverage__',
      coverageData = {
    path: '/Users/kof/work/projects/kof/cssinjs/react-jss/src/jss.js',
    statementMap: {},
    fnMap: {},
    branchMap: {},
    s: {},
    f: {},
    b: {},
    _coverageSchema: '332fd63041d2c1bcb487cc26dd0d5f7d97098a6c'
  },
      coverage = global[gcv] || (global[gcv] = {});

  if (coverage[path] && coverage[path].hash === hash) {
    return coverage[path];
  }

  coverageData.hash = hash;
  return coverage[path] = coverageData;
}();

var _jss = require('jss');

var _jssPresetDefault = require('jss-preset-default');

var _jssPresetDefault2 = _interopRequireDefault(_jssPresetDefault);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

exports['default'] = (0, _jss.create)((0, _jssPresetDefault2['default'])());