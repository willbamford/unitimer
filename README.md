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

Universal timer (Node.js and browser). Super simple i.e.

```js
var timer = require('unitimer')
timer.start('tag')
setTimeout(function () {
  var ms = timer.stop('tag') // ms ~= 1000.0
}, 1000)
```

## API

`start(tag)` called at the start of the section you want to measure the performance of.

`stop(tag)` called at the end, returns interval time in milliseconds of that section.

`mean(tag)` returns arithmetic average in milliseconds.

`total(tag)` returns the total time taken for a given tag (addition of `start` / `stop` durations)

`count(tag)` returns the number of intervals measured.

`min(tag)` returns the minimum interval time recorded.

`max(tag)` returns the maximum interval time recorded.
