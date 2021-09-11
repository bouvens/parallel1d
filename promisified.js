const Parallel = require('.')

module.exports = (worker, workerOptions, jobSize, options) => new Promise((resolve) => {
  const workers = new Parallel(worker, resolve, options)
  workers.start(workerOptions, jobSize)
})
