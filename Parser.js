'use strict';

var fs = require('fs');
var jade = require('jade');
var util = require('util');
var BaseParser = jade.Parser;

function Parser () {
  BaseParser.apply(this, arguments);
}

util.inherits(Parser, BaseParser);

Parser.prototype.parseInclude = function () {
  // var tok = this.expect('include');
  // var file = this.resolvePath(tok.val.trim(), 'include');
  // var mod = path.resolve('./.bin', path.dirname(file), path.basename(file, '.jade') + '.js');
  // if (mod.replace('.js', '.jade') !== file) {
  //   this.dependencies.push(file);
  //   return new nodes.Code('buf.push(require("' + mod + '").call(this, locals));');
  // }

  return this.super_.parseInclude.apply(this, arguments);
};
