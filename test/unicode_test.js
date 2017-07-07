// example from README
console.log(
  require('markdown-it')()
    .use(require('../')(
      /@([\u{1F4A9}-\u{1F4AB}])/gu,

      function (match, utils) {
		console.log(match)
        return '<found emoji>'
             + match[1]
             + '</found emoji>'
      }
    ))
    .render("@hello @💨@💩@💪@💫@💬")
)
