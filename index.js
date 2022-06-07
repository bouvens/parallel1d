const DEFAULTS = {
  // eslint-disable-next-line no-console
  onError: console.error,
  numberOfWorkers: (globalThis.navigator || navigator).hardwareConcurrency || 4,
  ArrayConstructor: Array,
}

function Parallel1d(
  Worker,
  onUpdate,
  {
    onError = DEFAULTS.onError,
    numberOfWorkers = DEFAULTS.numberOfWorkers,
    ArrayConstructor = DEFAULTS.ArrayConstructor,
  } = DEFAULTS,
) {
  let workers = []
  let finished
  let result
  this.threads = numberOfWorkers

  const reinitializeResult = () => {
    finished = 0
    result = []
  }

  const returnUpdated = () => {
    let length = 0
    for (let i = 0; i < this.threads; i++) {
      length += result[i].length
    }

    let flattened
    let offset = 0

    if (ArrayConstructor === Array) {
      flattened = [].concat(...result)
    } else {
      flattened = new ArrayConstructor(length)
      for (let i = 0; i < this.threads; i++) {
        const addition = result[i]
        flattened.set(addition, offset)
        offset += addition.length
      }
    }

    onUpdate(flattened)
    reinitializeResult()
  }

  this.terminate = () => {
    workers.forEach((worker) => {
      worker.terminate()
    })
    workers = []
    return this
  }

  const handleUpdate = (i) => ({ data }) => {
    result[i] = data
    finished += 1
    if (finished === this.threads) {
      returnUpdated()
    }
  }

  const handleError = (error) => {
    this.terminate()
    reinitializeResult()
    onError(error)
  }

  const initialize = () => {
    for (let i = 0; i < this.threads; i++) {
      workers[i] = new Worker()
      workers[i].addEventListener('message', handleUpdate(i))
      workers[i].addEventListener('error', handleError)
    }
  }

  this.start = (options, jobSize) => {
    let from = jobSize % this.threads
    const step = (jobSize - from) / this.threads

    reinitializeResult()

    if (!workers.length) {
      initialize()
    }

    for (let i = 0; i < this.threads; i++) {
      const to = from + step
      if (!workers[i]) {
        // we got an error and a pool was cleared
        break
      }
      workers[i].postMessage({
        ...options,
        from: i === 0 ? 0 : from,
        to,
      })
      from = to
    }
    return this
  }
}

Parallel1d.DEFAULTS = DEFAULTS

module.exports = Parallel1d
