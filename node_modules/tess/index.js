'use strict';

var tesses = 0

module.exports = function tess(opts, fn) {
  tesses++

  var tests = []

  if (!fn) {
    fn = opts
    opts = {}
  }

  if (typeof opts === 'string')
    opts = {
      name: opts
    }

  opts.name = opts.name || ''
  opts.shh = opts.shh || false

  fn(function runTest(title, fn) {
    var test = {
      fn: fn,
      success: false,
      title: title
    }

    try {
      fn()
      test.success = true
    } catch(e) {
      test.error = e
    } finally {
      tests.push(test)
    }
  })

  if (!opts.shh) {
    tests.forEach(function(test, index) {
      function black(str) {
        return '\u001b[30m' + str + '\u001b[39m'
      }
      function white(str) {
        return '\u001b[37m' + str + '\u001b[39m'
      }
      function cyanBg(str) {
        return '\u001b[46m' + str + '\u001b[49m'
      }
      function magentaBg(str) {
        return '\u001b[45m' + str + '\u001b[49m'
      }
      function greenBg(str) {
        return '\u001b[42m' + str + '\u001b[49m'
      }
      function redBg(str) {
        return '\u001b[41m' + str + '\u001b[49m'
      }
      function bold(str) {
        return '\u001b[1m' + str + '\u001b[22m'
      }

      var icon, heading = ''

      if (index === 0) {
        heading += tesses > 1 ? '\n' : ''

        if (opts.name)
          heading += magentaBg(white(bold(' ' + opts.name.toUpperCase() + '. '))) + '\n'
      }

      if (test.success) {
        icon = '✔︎'
        heading += cyanBg(' ') + greenBg(black(' ' + icon + ' ' + test.title + ' '))
      } else {
        icon = '✖'
        heading += magentaBg(' ') + redBg(bold(' ' + icon + ' ' + test.title + ' '))
      }

      console.log(heading)

      if (test.error)
        console.log(magentaBg(black('  ' + test.error.stack)))
    })
  }

  return tests
}