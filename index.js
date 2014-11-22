/*!
 * remarkable-regexp
 * Copyright (c) 2014 Alex Kocharin
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var util  = require('util')
var stuff = require('./utils')

/**
 * Expose `Plugin`
 */

module.exports = Plugin

/**
 * Constructor function
 */

function Plugin(regexp, replacer) {
  // return value should be a callable function
  // with strictly defined options passed by remarkable
  var self = function(remarkable, options) {
    self.options = options
    self.init(remarkable)
  }

  // initialize plugin object
  self.__proto__ = Plugin.prototype

  // clone regexp with all the flags
  var flags = (regexp.global     ? 'g' : '')
            + (regexp.multiline  ? 'm' : '')
            + (regexp.ignoreCase ? 'i' : '')

  self.regexp = RegExp(regexp.source, flags)

  // copy init options
  self.replacer = replacer

  // this plugin can be inserted multiple times,
  // so we're generating unique name for it
  self.id = 'regexp-' + String(Math.random).slice(2)

  return self
}

util.inherits(Plugin, Function)

// function that registers plugin with remarkable
Plugin.prototype.init = function(remarkable) {
  var self = this

  // push an inline rule
  remarkable.inline.ruler.push(self.id, function(state, silent) {
    // slowwww... maybe use an advanced regexp engine for this
    var match = self.regexp.exec(state.src.slice(state.pos))
    if (!match) return false

    // valid match found, now we need to advance cursor
    state.pos += match[0].length

    // don't insert any tokens in silent mode
    if (silent) return true

    state.push({
      type  : self.id,
      level : state.level,
      match : match,
    })

    return true
  })

  // add a renderer rule
  remarkable.renderer.rules[self.id] = function(tokens, id, options, env) {
    return self.replacer(tokens[id].match, stuff)
  }
}

