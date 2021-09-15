const Parallel = require('.')

module.exports = (worker, workerOptions, jobSize, options) => new Promise((resolve) => {
  const workers = new Parallel(worker, (result) => {
    workers.terminate()
    resolve(result)
  }, options)
  workers.start(workerOptions, jobSize)
})
