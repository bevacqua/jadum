'use strict';

var fs = require('fs');
var path = require('path');
var jade = require('jade');
var util = require('util');
var nodes = jade.nodes;
var BaseParser = jade.Parser;

function Parser () {
  BaseParser.apply(this, arguments);
}

util.inherits(Parser, BaseParser);

Parser.prototype.parseInclude = function () {
  var tok = this.expect('include');
  var file = this.resolvePath(tok.val.trim(), 'include');
  var mod = path.resolve(this.options.out, path.dirname(file), path.basename(file, '.jade') + '.js');

  this.dependencies.push(file);

  return new nodes.Code('buf.push(require("' + mod + '").call(this, locals));');
};

module.exports = Parser;
