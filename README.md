# unitimer

<a href="https://npmjs.org/package/unitimer">
  <img
    src="https://img.shields.io/npm/v/unitimer.svg?style=flat-square"
    alt="NPM version" />
</a>
<a href="https://standardjs.com">
  <img
    src="https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square"
    alt="Standard" />
</a>
<a href="https://npmcdn.com/unitimer/dist/unitimer.min.js">
   <img
    src="https://badge-size.herokuapp.com/WebSeed/unitimer/master/dist/unitimer.min.js.svg?compression=gzip"
    alt="File size" />
</a>

Universal timer for Node.js and browser:

```js
var createTimer = require('unitimer')
var timer = createTimer().start()
setTimeout(function () {
  var ms = timer.stop() // ms ~= 1000.0
}, 1000)
```

Multiple:

```js
const [a, b] = createTimer(['a', 'b'])
a.start()
b.start()

// ...

a.stop()
b.stop()

a.log()
b.log()
```

## API

### `timer.start()`

Begin measuring interval.

### `timer.stop()`

End the interval. Returns the elapsed time in milliseconds.

Note: `start()` and `stop()` can be called multiple times (which affects the total time, count, mean etc.).

### `timer.took()`

Returns the most recent start / stop interval in milliseconds.

### `timer.mean()`

Returns arithmetic average in milliseconds.

### `timer.total()`

Returns the total time taken (an addition of `start` / `stop` intervals)

### `timer.count()`

Returns the number of intervals measured.

### `timer.min()`

Returns the minimum interval time recorded.

### `timer.max()`

Returns the maximum interval time recorded.

### `timer.info(precision)`

Returns a string summary of timer total, mean, total, min and max. `precision` is number of decimal places to show (_optional_).

### `timer.log(precision)`

`console.log` of `timer.info()` (see above)

### `timer.stats()`

Returns a stats object.
