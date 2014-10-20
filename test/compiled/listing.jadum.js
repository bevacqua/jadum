var jade = require("jadum/runtime");
module.exports = function listing(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;
;var locals_for_with = (locals || {});(function (require) {
buf.push("<h1>This is some awesome listing!</h1><ul>");
// iterate ['a', 'b', 'c']
;(function(){
  var $$local = locals["item"];
  var $$obj = ['a', 'b', 'c'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = locals["item"] = $$obj[$index];

buf.push(require("./item").call(this, locals));
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = locals["item"] = $$obj[$index];

buf.push(require("./item").call(this, locals));
    }

  locals["item"] = $$local;
  }
}).call(this);

buf.push("</ul>");}.call(this,"require" in locals_for_with?locals_for_with.require:typeof require!=="undefined"?require:undefined));;return buf.join("");
}