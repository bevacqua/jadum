'use strict';

var fs = require('fs');
var path = require('path');
var jade = require('jade');
var util = require('util');
var nodes = jade.nodes;
var BaseParser = jade.Parser;

function Parser (a,b,c) {
  BaseParser.apply(this, arguments);
}

util.inherits(Parser, BaseParser);

Parser.prototype.parseInclude = function () {
  var tok = this.expect('include').val.trim();
  var file = this.resolvePath(tok, 'include');
  var mod = tok.indexOf('.') === 0 ? tok : './' + tok;

  this.dependencies.push(file);

  return new nodes.Code('buf.push(require("' + mod + '").call(this, locals));');
};

module.exports = Parser;
