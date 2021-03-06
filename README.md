# unitimer

<a href="https://npmjs.org/package/unitimer">
  <img
    src="https://img.shields.io/npm/v/unitimer.svg?style=flat-square"
    alt="NPM version" />
</a>

Universal timer for Node.js and browser:

```js
import createTimer from 'unitimer'

const timer = createTimer().start()
setTimeout(() => {
  const ms = timer.stop() // ms ~= 1000.0
  timer.log() // output to console
}, 1000)
```

Multiple timers:

```js
import createTimer from 'unitimer'

const [a, b] = createTimer(['a', 'b'])
a.start()
b.start()

// ...
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
