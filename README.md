# jadist

> A lean Jade compiler that understands Browserify and reuses partials

Works just like `jade`, except that the CLI compiles views producing a syntax like below.

```js
module.exports = function (model) {
  // view rendering...
}
```

The other difference is that the traditional Jade compiler inlines partials when it finds `include` statements, whereas `jadist` uses `require` statements to reuse partials, saving precious bytes in client-side code.

## Install

```shell
npm install -S jadist
```

## CLI

The CLI works the same way as the one in `jade`, but it always compiles views for the client-side, as Common.JS modules.

```shell
jadist views/**/*.jade -o .bin --no-debug --obj '{"basedir":"views"}'
```

## API

The API is the same as the API in Jade, but it produces `require` statements instead of inlining `include` statements.

# License

MIT
