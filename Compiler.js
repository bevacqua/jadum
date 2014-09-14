'use strict';

var jade = require('jade');
var util = require('util');
var BaseCompiler = jade.Compiler;

function Compiler () {
  BaseCompiler.apply(this, arguments);
}

util.inherits(Compiler, BaseCompiler);

Compiler.prototype.visitEach = function (each) {
  this.buf.push(''
    + '// iterate ' + each.obj + '\n'
    + ';(function(){\n'
    + '  var $$local = locals["' + each.val + '"];\n'
    + '  var $$obj = ' + each.obj + ';\n'
    + '  if (\'number\' == typeof $$obj.length) {\n');

  if (each.alternative) {
    this.buf.push('  if ($$obj.length) {');
  }

  this.buf.push(''
    + '    for (var ' + each.key + ' = 0, $$l = $$obj.length; ' + each.key + ' < $$l; ' + each.key + '++) {\n'
    + '      var ' + each.val + ' = locals["' + each.val + '"] = $$obj[' + each.key + '];\n');

  this.visit(each.block);

  this.buf.push('    }\n');

  if (each.alternative) {
    this.buf.push('  } else {');
    this.visit(each.alternative);
    this.buf.push('  }');
  }

  this.buf.push(''
    + '  } else {\n'
    + '    var $$l = 0;\n'
    + '    for (var ' + each.key + ' in $$obj) {\n'
    + '      $$l++;'
    + '      var ' + each.val + ' = locals["' + each.val + '"] = $$obj[' + each.key + '];\n');

  this.visit(each.block);

  this.buf.push('    }\n');
  if (each.alternative) {
    this.buf.push('    if ($$l === 0) {');
    this.visit(each.alternative);
    this.buf.push('    }');
  }

  this.buf.push(''
    + '  locals["' + each.val + '"] = $$local;\n'
    + '  }\n}).call(this);\n');
};

module.exports = Compiler;
