(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.unitimer = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
function now () {
  return typeof window.performance !== 'undefined' &&
    typeof window.performance.now !== 'undefined'
      ? window.performance.now()
      : Date.now()
}

module.exports = now

},{}],2:[function(require,module,exports){
var now = require('./now')

function toFixed (v, dp) {
  if (typeof dp === 'undefined') {
    return v
  }
  return v.toFixed(dp)
}

function createInstance (tag) {
  var totalTime = 0
  var meanTime = 0
  var minTime = -1
  var maxTime = -1
  var count = 0
  var tookTime = -1
  var startTimes = {}

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

},{"./now":1}]},{},[2])(2)
});