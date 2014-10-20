'use strict';

var fs = require('fs');
var test = require('tape');
var jadum = require('..');

function read (file) {
  return fs.readFileSync(file, 'utf8');
}

test(function (t) {
  var file = 'test/fixture/listing.jade';
  var compiled = jadum.compileClient(read(file), { filename: file });
  var prefix = 'var jade = require("jadum/runtime");\nmodule.exports = ';
  var expected = read('test/compiled/listing.jadum.js');

  t.equal(prefix + compiled, expected);
  t.end();
});
