
Make simple remarkable plugins easier.

## Usage:

```js
new (require('remarkable'))()
  .use(require('remarkable-regexp')(
    /@(\w+)/,

    function(match, utils) {
      var url = 'http://example.org/u/' + match[1]

      return '<a href="' + utils.escape(url) + '">'
           + utils.escape(match[1])
           + '</a>'
    }
  ))
  .render("hello @user")
```

## Fair warning:

1. it could be slower than you expect
2. it is a draft, breaking changes might happen

