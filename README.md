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

Universal timer (Node.js and browser)

```js
var timer = require('unitimer')
timer.start('label')
setTimeout(function () {
  var ms = timer.stop('label') // ms ~= 1000.0
}, 1000)
```
