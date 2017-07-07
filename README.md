
Make simple [markdown-it](https://github.com/markdown-it/markdown-it) plugins easier.

## Usage:

```js
var md     = require('markdown-it')
var Plugin = require('markdown-it-regexp')

var plugin = Plugin(
  // regexp to match
  /@(\w+)/,

  // this function will be called when something matches
  function(match, utils) {
    var url = 'http://example.org/u/' + match[1]

    return '<a href="' + utils.escape(url) + '">'
         + utils.escape(match[1])
         + '</a>'
  }
)

md()
  .use(plugin)
  .render("hello @user")

// prints out:
// <p>hello <a href="http://example.org/u/user">user</a></p>
```

[Live demo as jsfiddle](https://jsfiddle.net/arve0/nz0Lb6ox/).

## Fair warning:

1. it could be slower than you expect
2. it is a draft, breaking changes might happen
3. markdown-it only stop at certain character, then perform the regex match in this plugin. [markdown-it Development Recommendations](https://github.com/markdown-it/markdown-it/blob/master/docs/development.md)
