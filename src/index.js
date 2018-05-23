import now from './now'

const toFixed = (v, dp) => {
  if (typeof dp === 'undefined') {
    return v
  }
  return v.toFixed(dp)
}

const createInstance = (tag) => {
  let totalTime
  let meanTime
  let minTime
  let maxTime
  let count
  let tookTime
  let startTimes

  const reset = () => {
    totalTime = 0
    meanTime = 0
    minTime = -1
    maxTime = -1
    count = 0
    tookTime = 0
    startTimes = {}
  }

  reset()

  return {
    start(id = 'default') {
      const time = now()
      startTimes[id] = time
      return this
    },
    stop(id = 'default') {
      const startTime = startTimes[id]
      if (!startTime) { return -1 }
      tookTime = now() - startTime
      minTime = minTime === -1 ? tookTime : Math.min(minTime, tookTime)
      maxTime = maxTime === -1 ? tookTime : Math.max(maxTime, tookTime)
      totalTime += tookTime
      count += 1
      meanTime = totalTime / count
      startTimes[id] = undefined
      return tookTime
    },
    reset,
    took() {
      return tookTime
    },
    total() {
      return totalTime
    },
    mean() {
      return meanTime
    },
    count() {
      return count
    },
    min() {
      return minTime
    },
    max() {
      return maxTime
    },
    stats() {
      return {
        mean: meanTime,
        took: tookTime,
        total: totalTime,
        count,
        min: minTime,
        max: maxTime
      }
    },
    info(dp) {
      return `${tag ? `[${tag}] ` : ''}mean: ${toFixed(meanTime, dp)
        }ms, took: ${toFixed(tookTime, dp)
        }ms, total: ${toFixed(totalTime, dp)
        }ms, count: ${count
        }, min: ${toFixed(minTime, dp)
        }ms, max: ${toFixed(maxTime, dp)
        }ms`
    },
    log(dp) {
      // eslint-disable-next-line no-console
      console.log(this.info(dp))
    }
  }
}

const isArray = o => Object.prototype.toString.call(o) === '[object Array]'

const isString = o => (typeof o === 'string') || (o instanceof String)

const createTimer = (tags) => {
  if (isArray(tags)) {
    const a = []
    for (let i = 0; i < tags.length; i += 1) {
      a.push(createInstance(tags[i]))
    }
    return a
  }
  if (isString(tags)) {
    return createInstance(tags)
  }
  return createInstance()
}

export default createTimer
