const DEFAULTS = {
  // eslint-disable-next-line no-console
  handleError: console.error,
  numberOfWorkers: (globalThis.navigator || navigator).hardwareConcurrency || 4,
  ArrayConstructor: Array,
}

function Parallel1d(
  Worker,
  handleUpdate,
  {
    handleError = DEFAULTS.handleError,
    numberOfWorkers = DEFAULTS.numberOfWorkers,
    ArrayConstructor = DEFAULTS.ArrayConstructor,
  } = DEFAULTS,
) {
  let workers = []
  let finished
  let result
  this.threads = numberOfWorkers

  function reinitializeResult() {
    finished = 0
    result = []
  }

  const returnUpdated = () => {
    let length = 0
    for (let i = 0; i < this.threads; i++) {
      length += result[i].length
    }

    let flattened
    let handleResult
    let offset = 0
    if (ArrayConstructor === Array) {
      flattened = []
      handleResult = (addition) => {
        flattened.push(...addition)
      }
    } else {
      flattened = new ArrayConstructor(length)
      handleResult = (addition) => {
        flattened.set(addition, offset)
        offset += addition.length
      }
    }

    for (let i = 0; i < this.threads; i++) {
      handleResult(result[i])
    }
    handleUpdate(flattened)
    reinitializeResult()
  }

  const catchUpdate = (i) => ({ data }) => {
    result[i] = data
    finished += 1
    if (finished === this.threads) {
      returnUpdated()
    }
  }

  this.terminate = () => {
    workers.forEach((worker) => {
      worker.terminate()
    })
    workers = []
    return this
  }

  const catchError = (error) => {
    this.terminate()
    reinitializeResult()
    handleError(error)
  }

  const initialize = () => {
    for (let i = 0; i < this.threads; i++) {
      workers[i] = new Worker()
      workers[i].addEventListener('message', catchUpdate(i))
      workers[i].addEventListener('error', catchError)
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
