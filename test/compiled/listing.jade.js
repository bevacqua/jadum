function template(locals) {
var buf = [];
var jade_mixins = {};
var jade_interp;

buf.push("<h1>This is some awesome listing!</h1><ul>");
// iterate ['a', 'b', 'c']
;(function(){
  var $$obj = ['a', 'b', 'c'];
  if ('number' == typeof $$obj.length) {

    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
      var item = $$obj[$index];

buf.push("<li><span>Here comes item:</span><span>Note that this is quite a big template file</span><span>But it's included everywhere, because Jade!</span><span>So that's awesome... but compiling becomes an issue...</span><span>" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</span></li>");
    }

  } else {
    var $$l = 0;
    for (var $index in $$obj) {
      $$l++;      var item = $$obj[$index];

buf.push("<li><span>Here comes item:</span><span>Note that this is quite a big template file</span><span>But it's included everywhere, because Jade!</span><span>So that's awesome... but compiling becomes an issue...</span><span>" + (jade.escape(null == (jade_interp = item) ? "" : jade_interp)) + "</span></li>");
    }

  }
}).call(this);

buf.push("</ul>");;return buf.join("");
}
