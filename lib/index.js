var now = require('./now')

function unitimer () {
  var totalTime = 0
  var meanTime = 0
  var minTime = -1
  var maxTime = -1
  var count = 0
  var startTime = null

  return {
    start: function () {
      var time = now()
      startTime = time
      return this
    },
    stop: function () {
      if (!startTime) { return -1 }
      var stopTime = now()
      var took = stopTime - startTime
      minTime = minTime === -1 ? took : Math.min(minTime, took)
      maxTime = maxTime === -1 ? took : Math.max(maxTime, took)
      totalTime += took
      count += 1
      meanTime = totalTime / count
      startTime = null
      return took
    },
    total: function () {
      return totalTime
    },
    mean: function () {
      return meanTime
    },
    count: function () {
      return count
    },
    min: function () {
      return minTime
    },
    max: function () {
      return maxTime
    },
    stats: function () {
      return {
        total: totalTime,
        mean: meanTime,
        count: count,
        min: minTime,
        max: maxTime
      }
    },
    info: function () {
      return 'mean: ' + meanTime +
        'ms, total: ' + totalTime +
        'ms, count: ' + count +
        ', min: ' + minTime +
        'ms, max: ' + maxTime +
        'ms'
    },
    log: function () {
      console.log(this.info())
    }
  }
}

module.exports = unitimer
