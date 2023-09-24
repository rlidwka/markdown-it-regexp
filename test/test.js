// example from README
console.log(
  require('markdown-it')()
    .use(require('../')(
      /@(\w+)/,

      function (match, utils, env) {
        if (!env.userExists(match[1])) return '@' + match[1];
        var url = 'http://example.org/u/' + match[1]

        return '<a href="' + utils.escape(url) + '">'
             + utils.escape(match[1])
             + '</a>'
      }
    ))
    .render(
      "hello @user and @user2",
      {
        userExists: function (u) {
          return u === "user"
        }
      }
    )
)
