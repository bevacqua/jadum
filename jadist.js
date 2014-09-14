'use strict';

var jade = require('jade');
var Compiler = require('./Compiler');
var Parser = require('./Parser');
var api = {};

function compileClient (text, o) {
  var options = o;
  if (options === void 0) {
    options = {};
  }
  options.compiler = Compiler;
  options.parser = Parser;
  return jade.compileClient(text, options).replace();
}

function map (key) {
  api[key] = jade[key];
}

Object.keys(jade).forEach(map);

api.compileClient = compileClient;

module.exports = api;
