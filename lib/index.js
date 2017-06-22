var now = require('./now');

function toFixed(v, dp) {
  if (typeof dp === 'undefined') {
    return v;
  }
  return v.toFixed(dp);
}

function createInstance(tag) {
  var totalTime = void 0;
  var meanTime = void 0;
  var minTime = void 0;
  var maxTime = void 0;
  var _count = void 0;
  var tookTime = void 0;
  var startTimes = void 0;

  function reset() {
    totalTime = 0;
    meanTime = 0;
    minTime = -1;
    maxTime = -1;
    _count = 0;
    tookTime = 0;
    startTimes = {};
  }

  reset();

  return {
    start: function start() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

      var time = now();
      startTimes[id] = time;
      return this;
    },
    stop: function stop() {
      var id = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'default';

      var startTime = startTimes[id];
      if (!startTime) {
        return -1;
      }
      tookTime = now() - startTime;
      minTime = minTime === -1 ? tookTime : Math.min(minTime, tookTime);
      maxTime = maxTime === -1 ? tookTime : Math.max(maxTime, tookTime);
      totalTime += tookTime;
      _count += 1;
      meanTime = totalTime / _count;
      startTimes[id] = undefined;
      return tookTime;
    },

    reset: reset,
    took: function took() {
      return tookTime;
    },
    total: function total() {
      return totalTime;
    },
    mean: function mean() {
      return meanTime;
    },
    count: function count() {
      return _count;
    },
    min: function min() {
      return minTime;
    },
    max: function max() {
      return maxTime;
    },
    stats: function stats() {
      return {
        mean: meanTime,
        took: tookTime,
        total: totalTime,
        count: _count,
        min: minTime,
        max: maxTime
      };
    },
    info: function info(dp) {
      return (tag ? '[' + tag + '] ' : '') + 'mean: ' + toFixed(meanTime, dp) + 'ms, took: ' + toFixed(tookTime, dp) + 'ms, total: ' + toFixed(totalTime, dp) + 'ms, count: ' + _count + ', min: ' + toFixed(minTime, dp) + 'ms, max: ' + toFixed(maxTime, dp) + 'ms';
    },
    log: function log(dp) {
      // eslint-disable-next-line no-console
      console.log(this.info(dp));
    }
  };
}

function isArray(o) {
  return Object.prototype.toString.call(o) === '[object Array]';
}

function isString(o) {
  return typeof o === 'string' || o instanceof String;
}

function createTimer(tags) {
  if (isArray(tags)) {
    var a = [];
    for (var i = 0; i < tags.length; i += 1) {
      a.push(createInstance(tags[i]));
    }
    return a;
  }
  if (isString(tags)) {
    return createInstance(tags);
  }
  return createInstance();
}

module.exports = createTimer;