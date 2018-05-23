import nowNode from './now-node'
import nowBrowser from './now-browser'

let now
if (typeof window === 'undefined') {
  now = nowNode
} else {
  now = nowBrowser
}

export default () => now()
