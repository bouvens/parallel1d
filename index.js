const DEFAULTS = {
  handleError: console.error,
  numberOfWorkers: navigator.hardwareConcurrency,
  ArrayConstructor: Array,
}

module.exports = function Parallel1d (
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

  function reinitializeResult () {
    finished = 0
    result = []
  }

  const returnUpdated = () => {
    let length = 0
    for (let i = 0; i < this.threads; i++) {
      length += result[i].length
    }

    let offset = 0
    let flattened = ArrayConstructor === Array ? [] : new ArrayConstructor(length)

    for (let i = 0; i < this.threads; i++) {
      if (flattened.concat) {
        flattened = flattened.concat(result[i])
      } else {
        flattened.set(result[i], offset)
      }
      offset += result[i].length
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
