const test = require('ava')
const sinon = require('sinon')
const timer = require('../lib')

function stubHrtime (times) {
  let index = 0
  function fn () {
    return times[index++]
  }
  return sinon.stub(process, 'hrtime', fn)
}

test('start label does not exist', (t) => {
  const millis = timer.stop('does-not-exist')
  t.is(millis, -1)
})

test('start stop intervals', (t) => {
  const times = [
    [4, 10],
    [10, 50],
    [9, 999999999],
    [10, 0]
  ]
  const hrtime = stubHrtime(times)
  timer.start('A')
  const msA = timer.stop('A')
  t.is(msA, 6000.000040000001) // 6000.00004
  timer.start('B')
  const msB = timer.stop('B')
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
  timer.start('A')
  timer.start('B')
  const msA = timer.stop('A')
  timer.start('C')
  const msC = timer.stop('C')
  const msB = timer.stop('B')
  t.is(msA, 6000.000040000001) // 6000.00004
  t.is(msB, 26000)
  t.is(msC, 1000.0000999999975) // 1000.000100
  hrtime.restore()
})

test('total time', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0],
    [50, 0] // Not used
  ]
  const hrtime = stubHrtime(times)
  timer.start('TT')
  timer.stop('TT')
  timer.start('TT')
  timer.stop('TT')
  timer.stop('TT') // Ignored
  t.is(timer.total('TT'), 15000.0)
  hrtime.restore()
})

test('mean time', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0]
  ]
  const hrtime = stubHrtime(times)
  timer.start('MT')
  timer.stop('MT')
  timer.start('MT')
  timer.stop('MT')
  t.is(timer.count('MT'), 2)
  t.is(timer.mean('MT'), 7500.0)
  hrtime.restore()
})

test('count', (t) => {
  const times = [
    [5, 0],
    [10, 0],
    [20, 0],
    [30, 0]
  ]
  const hrtime = stubHrtime(times)
  timer.start('CT')
  timer.stop('CT')
  timer.start('CT')
  timer.stop('CT')
  t.is(timer.count('CT'), 2)
  hrtime.restore()
})

test('max & min time', (t) => {
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
  timer.start('MM')
  timer.stop('MM')
  timer.start('MM')
  timer.stop('MM')
  timer.start('MM')
  timer.stop('MM')
  timer.start('MM')
  timer.stop('MM')
  t.is(timer.max('MM'), 10000)
  t.is(timer.min('MM'), 1000)
  hrtime.restore()
})
