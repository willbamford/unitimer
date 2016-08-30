const test = require('ava')
const proxyquire = require('proxyquire')
// const timer = require('../lib')

function getUnitimer () {
  return proxyquire('../lib', {
    './hrtime': () => {
      return [2, 123456789]
    }
  })
}

test('start is a function', (t) => {
  const timer = getUnitimer()
  t.is(typeof timer.start, 'function')
})

test('end is a function', (t) => {
  const timer = getUnitimer()
  t.is(typeof timer.end, 'function')
})

test('return -1 if start label does not exist', (t) => {
  const timer = getUnitimer()
  const millis = timer.end('does-not-exist')
  t.is(millis, -1)
})

test('measure time taken between start and end', (t) => {
  const timer = getUnitimer()
  timer.start('label')
  const millis = timer.end('label', 'ms')
  t.is(millis, 2123.456789)
})
