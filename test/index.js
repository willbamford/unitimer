const test = require('ava')
const sinon = require('sinon')
const createTimer = require('../lib/unitimer')

function stubHrtime(times) {
  let index = 0
  function fn() {
    return times[index++]
  }
  return sinon.stub(process, 'hrtime').callsFake(fn)
}

test('start() then stop() returns the interval', (t) => {
  const times = [
    [4, 10],
    [10, 50],
    [9, 999999999],
    [10, 0]
  ]
  const hrtime = stubHrtime(times)
  const a = createTimer().start()
  const msA = a.stop()
  t.is(msA, 6000.000040000001) // 6000.00004
  const b = createTimer().start()
  const msB = b.stop()
  t.is(msB, 0.0000010000003385357559) // 0.000001
  hrtime.restore()
})

test('handles async start() then stop() using optional identifier', (t) => {
  const times = [
    [4, 0],
    [4, 0],
    [9, 0],
    [10, 0]
  ]
  const hrtime = stubHrtime(times)
  const timer = createTimer()
  timer.start('a')
  timer.start('b')
  const msA = timer.stop('a')
  const msB = timer.stop('b')
  t.is(msA, 5000)
  t.is(msB, 6000)
  hrtime.restore()
})

test('stop() with no start() returns -1', (t) => {
  const timer = createTimer()
  const millis = timer.stop()
  t.is(millis, -1)
})

test('use last start() before stop()', (t) => {
  const times = [
    [4, 10],
    [5, 10],
    [10, 50],
    [9, 999999999],
    [10, 0]
  ]
  const hrtime = stubHrtime(times)
  const a = createTimer().start()
  a.start()
  const msA = a.stop()
  t.is(msA, 5000.000040000001) // 6000.00004
  const b = createTimer().start()
  const msB = b.stop()
  t.is(msB, 0.0000010000003385357559) // 0.000001
  hrtime.restore()
})

test('overlapping intervals', (t) => {
  const times = [
    [4, 10],      // A0
    [4, 11],      // B0
    [10, 50],     // A1
    [22, 100],    // C0
    [23, 200],    // C1
    [30, 11]      // B1
  ]
  const hrtime = stubHrtime(times)
  const a = createTimer().start()
  const b = createTimer().start()
  const msA = a.stop()
  const c = createTimer().start()
  const msC = c.stop()
  const msB = b.stop()
  t.is(msA, 6000.000040000001) // 6000.00004
  t.is(msB, 26000)
  t.is(msC, 1000.0000999999975) // 1000.000100
  hrtime.restore()
})

test('reset()', (t) => {
  const times = [
    [1, 0],
    [2, 0]
  ]
  const hrtime = stubHrtime(times)
  const a = createTimer().start()
  a.stop()
  a.reset()
  t.deepEqual(
    a.stats(),
    {
      took: 0,
      total: 0,
      mean: 0,
      count: 0,
      min: -1,
      max: -1
    }
  )
  hrtime.restore()
})

test('total() is total time', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0],
    [50, 0] // Not used
  ]
  const hrtime = stubHrtime(times)
  const timer = createTimer()
  timer.start()
  timer.stop()
  timer.start()
  timer.stop()
  timer.stop() // Ignored
  t.is(timer.total(), 15000.0)
  hrtime.restore()
})

test('mean() is arithmetic average', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0]
  ]
  const hrtime = stubHrtime(times)
  const timer = createTimer().start()
  timer.stop()
  timer.start()
  timer.stop()
  t.is(timer.count(), 2)
  t.is(timer.mean(), 7500.0)
  hrtime.restore()
})

test('count() is number of intervals', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0]
  ]
  const hrtime = stubHrtime(times)
  const timer = createTimer().start()
  timer.stop()
  timer.start()
  timer.stop()
  t.is(timer.count(), 2)
  hrtime.restore()
})

test('max() & min() time', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0],
    [40, 0],
    [41, 0],
    [100, 0],
    [102, 0]
  ]
  const hrtime = stubHrtime(times)
  const timer = createTimer().start()
  timer.stop()
  timer.start()
  timer.stop()
  timer.start()
  timer.stop()
  timer.start()
  timer.stop()
  t.is(timer.max(), 10000)
  t.is(timer.min(), 1000)
  hrtime.restore()
})

test('stats() returns a stats object', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0]
  ]
  const hrtime = stubHrtime(times)
  const timer = createTimer().start()
  timer.stop()
  timer.start()
  timer.stop()
  t.deepEqual(
    timer.stats(),
    {
      took: 10000,
      total: 15000,
      mean: 7500,
      count: 2,
      min: 5000,
      max: 10000
    }
  )
  hrtime.restore()
})

test('info() returns a summary string', (t) => {
  const times = [
    [5, 99],
    [10, 10000],
    [20, 3],
    [30, 50000]
  ]
  const hrtime = stubHrtime(times)
  const timer = createTimer().start()
  timer.stop()
  timer.start()
  timer.stop()
  t.is(
    timer.info(),
    'mean: 7500.029949ms, took: 10000.049996999998ms, total: 15000.059898ms, count: 2, min: 5000.009901ms, max: 10000.049996999998ms'
  )
  t.is(
    timer.info(3),
    'mean: 7500.030ms, took: 10000.050ms, total: 15000.060ms, count: 2, min: 5000.010ms, max: 10000.050ms'
  )
  t.is(typeof timer.log, 'function')
  hrtime.restore()
})

test('create single with tag', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0]
  ]
  const hrtime = stubHrtime(times)
  const foo = createTimer('foo')
  foo.start()
  foo.stop()
  t.is(
    foo.info(),
    '[foo] mean: 5000ms, took: 5000ms, total: 5000ms, count: 1, min: 5000ms, max: 5000ms'
  )
  hrtime.restore()
})

test('create multiple with tags', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0]
  ]
  const hrtime = stubHrtime(times)
  const [foo, bar] = createTimer(['foo', 'bar'])
  foo.start()
  foo.stop()
  bar.start()
  bar.stop()
  t.is(
    foo.info(),
    '[foo] mean: 5000ms, took: 5000ms, total: 5000ms, count: 1, min: 5000ms, max: 5000ms'
  )
  t.is(
    bar.info(),
    '[bar] mean: 10000ms, took: 10000ms, total: 10000ms, count: 1, min: 10000ms, max: 10000ms'
  )
  hrtime.restore()
})
