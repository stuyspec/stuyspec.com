"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = log;

var _cliColor = require("cli-color");

var _cliColor2 = _interopRequireDefault(_cliColor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function log(msg) {
  var t = /T([0-9:.]+)Z/g.exec(new Date().toISOString())[1];
  console.log(_cliColor2.default.green("[" + t + "] LiveReactload"), "::", _cliColor2.default.cyan(msg));

  for (var _len = arguments.length, data = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    data[_key - 1] = arguments[_key];
  }

  data.forEach(function (d) {
    return console.log(_cliColor2.default.yellow("  >"), _cliColor2.default.yellow(d));
  });
}