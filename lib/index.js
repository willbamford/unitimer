var now = require('./now')

var track = {}

var timer = {
  start: function (label) {
    if (!track[label]) {
      track[label] = {
        totalTime: 0,
        meanTime: 0,
        minTime: -1,
        maxTime: -1,
        count: 0
      }
    }
    var time = now()
    track[label].startTime = time
  },
  stop: function (label) {
    if (!track[label]) { return -1 }
    var o = track[label]
    if (!o.startTime) { return -1 }
    var stopTime = now()
    var took = stopTime - o.startTime
    o.startTime = null
    o.lastTook = took
    o.minTime = o.minTime === -1 ? took : Math.min(o.minTime, took)
    o.maxTime = o.maxTime === -1 ? took : Math.max(o.maxTime, took)
    o.totalTime += took
    o.count += 1
    o.meanTime = o.totalTime / o.count
    return took
  },
  total: function (label) {
    if (!track[label]) { return -1 }
    return track[label].totalTime
  },
  mean: function (label) {
    if (!track[label]) { return -1 }
    return track[label].meanTime
  },
  count: function (label) {
    if (!track[label]) { return -1 }
    return track[label].count
  },
  max: function (label) {
    if (!track[label]) { return -1 }
    return track[label].maxTime
  },
  min: function (label) {
    if (!track[label]) { return -1 }
    return track[label].minTime
  }
}

module.exports = timer
