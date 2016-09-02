var now = require('./now')

var starts = {}

var timer = {
  start: function (label) {
    starts[label] = now()
  },
  stop: function (label) {
    if (starts[label]) {
      return now() - starts[label]
    }
    return -1
  }
}

module.exports = timer
