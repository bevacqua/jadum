# jadum

> A lean Jade compiler that understands Browserify and reuses partials

Works just like `jade`, except that the CLI compiles views producing a syntax like below.

```js
module.exports = function (model) {
  // view rendering...
}
```

The other difference is that the traditional Jade compiler inlines partials when it finds `include` statements, whereas `jadum` uses `require` statements to reuse partials, saving precious bytes in client-side code.

## Install

```shell
npm install -S jadum
```

## CLI

The CLI works the same way as the one in `jade`, but it always compiles views for the client-side, as Common.JS modules.

```shell
jadum views/**/*.jade -o .bin --no-debug --obj '{"basedir":"views"}'
```

## API

The API is the same as the API in Jade, but it produces `require` statements instead of inlining `include` statements.

## Comparison

Take as input these two files: `listing.jade` and `item.jade`.

```jade
h1 This is some awesome listing!
ul
  each item in ['a', 'b', 'c']
    include item
```

```jade
li
  span Here comes item:
  span Note that this is quite a big template file
  span But it's included everywhere, because Jade!
  span So that's awesome... but compiling becomes an issue...
  span=item
```

As the `item.jade` template grows, every template that depends on it will grow twice as much, as the included template _(`item.jade`)_ **is inlined twice** in its parent _(`listing.jade`)_ template! Here is the output of `jade`.

```js
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
```

If we use `jadum`, however, we don't have these issues. We'll always have a fixed size determined by the length of the path passed to `require` statements. Pretty neat! Since `jadum` understands Browserify it won't hope for the best, in terms of expecting the Jade runtime to be globally included in your code. That's why there's the extra `require` at the top for the runtime. Browserify will take over when compiling the template, making sure it's only included once. Furthermore, if you use thee template in various places, then it will only be included once. That's where you save the vast majority of bytes.

```js
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
```

# License

MIT
