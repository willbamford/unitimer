const nowNode = require('./now-node')
const nowBrowser = require('./now-browser')

let now
if (typeof window === 'undefined') {
  now = nowNode
} else {
  now = nowBrowser
}

module.exports = now
