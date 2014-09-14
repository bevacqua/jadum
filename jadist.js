'use strict';

var jade = require('jade');
var Compiler = require('./Compiler');
var Parser = require('./Parser');

function compileClient (text, o) {
  var options = o;
  if (options === void 0) {
    options = {};
  }
  options.compiler = Compiler;
  options.parser = Parser;
  return 'module.exports = ' jade.compileClient(text, options).replace();
}

module.exports = {
  compileClient: compileClient
};
