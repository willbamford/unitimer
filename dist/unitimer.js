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

function createInstance (tag) {
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
      return (tag ? tag + ': ' : '') +
        'mean=' + meanTime +
        'ms, total=' + totalTime +
        'ms, count=' + count +
        ', min=' + minTime +
        'ms, max=' + maxTime +
        'ms'
    },
    log: function () {
      console.log(this.info())
    }
  }
}

function createTimer () {
  var tags = Array.prototype.slice.call(arguments)

  // Named instances
  if (tags.length > 0) {
    var r = {}
    tags.forEach(function (tag) {
      r[tag] = createInstance(tag)
    })
    return r
  }

  return createInstance()
}

module.exports = createTimer

},{"./now":1}]},{},[2])(2)
});