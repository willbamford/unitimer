var hrtime = require('./hrtime')
var starts = {}

var unitimer = {
  start: function (label) {
    starts[label] = hrtime()
  },
  end: function (label) {
    if (starts[label]) {
      var diff = hrtime(starts[label])
      return diff[0] * 1000 + diff[1] / 1000000
    }
    return -1
  }
}

module.exports = unitimer
