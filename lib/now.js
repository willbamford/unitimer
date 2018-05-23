var nowNode = require('./now-node');
var nowBrowser = require('./now-browser');

var now = void 0;
if (typeof window === 'undefined') {
  now = nowNode;
} else {
  now = nowBrowser;
}

module.exports = now;