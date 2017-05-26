var now = require('./now')

function toFixed (v, dp) {
  if (typeof dp === 'undefined') {
    return v
  }
  return v.toFixed(dp)
}

function createInstance (tag) {
  var totalTime
  var meanTime
  var minTime
  var maxTime
  var count
  var tookTime
  var startTimes

  function reset () {
    totalTime = 0
    meanTime = 0
    minTime = -1
    maxTime = -1
    count = 0
    tookTime = 0
    startTimes = {}
  }

  reset()

  return {
    start: function (id = 'default') {
      var time = now()
      startTimes[id] = time
      return this
    },
    stop: function (id = 'default') {
      const startTime = startTimes[id]
      if (!startTime) { return -1 }
      tookTime = now() - startTime
      minTime = minTime === -1 ? tookTime : Math.min(minTime, tookTime)
      maxTime = maxTime === -1 ? tookTime : Math.max(maxTime, tookTime)
      totalTime += tookTime
      count += 1
      meanTime = totalTime / count
      startTimes[id] = undefined
      return tookTime
    },
    reset,
    took: function () {
      return tookTime
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
        took: tookTime,
        total: totalTime,
        mean: meanTime,
        count: count,
        min: minTime,
        max: maxTime
      }
    },
    info: function (dp) {
      return (tag ? '[' + tag + '] ' : '') +
        'took: ' + toFixed(tookTime, dp) +
        'ms, mean: ' + toFixed(meanTime, dp) +
        'ms, total: ' + toFixed(totalTime, dp) +
        'ms, count: ' + count +
        ', min: ' + toFixed(minTime, dp) +
        'ms, max: ' + toFixed(maxTime, dp) +
        'ms'
    },
    log: function (dp) {
      console.log(this.info(dp))
    }
  }
}

function isArray (o) {
  return Object.prototype.toString.call(o) === '[object Array]'
}

function isString (o) {
  return (typeof o === 'string') || (o instanceof String)
}

function createTimer (tags) {
  if (isArray(tags)) {
    var a = []
    for (var i = 0; i < tags.length; i += 1) {
      a.push(createInstance(tags[i]))
    }
    return a
  }
  if (isString(tags)) {
    return createInstance(tags)
  }
  return createInstance()
}

module.exports = createTimer
