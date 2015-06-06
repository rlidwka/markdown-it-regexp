// example from README
console.log(
  require('markdown-it')()
    .use(require('../')(
      /@(\w+)/,

      function (match, utils) {
        var url = 'http://example.org/u/' + match[1]

        return '<a href="' + utils.escape(url) + '">'
             + utils.escape(match[1])
             + '</a>'
      }
    ))
    .render("hello @user")
)
