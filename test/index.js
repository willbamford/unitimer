const test = require('ava')
const sinon = require('sinon')
const timer = require('../lib')

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
  let index = 0
  function fn () {
    return times[index++]
  }
  var hrtime = sinon.stub(process, 'hrtime', fn)
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
  let index = 0
  function fn () {
    return times[index++]
  }
  var hrtime = sinon.stub(process, 'hrtime', fn)

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
