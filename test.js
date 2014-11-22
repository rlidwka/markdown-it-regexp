console.log(

new (require('remarkable'))()
  .use(require('./')(
    /@(\w+)/,

    function(match, utils) {
      var url = 'http://your.website.example.com/u/' + match[1]

      return '<a href="' + utils.escape(url) + '">'
           + utils.escape(match[1])
           + '</a>'
    }
  ))
  .render("hello @user")

)
