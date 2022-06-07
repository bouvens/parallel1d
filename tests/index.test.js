globalThis = {
  navigator: {
    hardwareConcurrency: 8,
  },
}

const Parallel = require('..')
const mockWorker = require('./mock.worker')

// just one calculation function for example
function double(n) {
  return n * 2
}

// it gets passed options for worker (i.e. `input`), and special props `from` and `to`
const testWorker = mockWorker(function onmessage({ data: { input, from, to } }) {
  const result = []
  for (let i = from; i < to; i++) {
    const n = input[i]

    result.push(double(n))
  }

  // we don't use postMessage to mock it simpler
  this.postMessageMock(result)
})

const TEST_ERROR = new Error('test error text')

const failWorker = mockWorker(function onmessageFail() {
  this.postErrorMock(TEST_ERROR)
})

let input
let doubled

beforeEach(() => {
  input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  doubled = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
})

test('double 10 numbers with 4 workers', (done) => {
  const workers = new Parallel(testWorker, (result) => {
    expect(result).toStrictEqual(doubled)
    done()
  }, { numberOfWorkers: 4 })
  // pass any options for worker and length of array to divide it to workers
  workers.start({ input }, input.length)
})

test('double 10 numbers with 1 worker', (done) => {
  const workers = new Parallel(testWorker, (result) => {
    expect(result).toStrictEqual(doubled)
    done()
  }, { numberOfWorkers: 1 })
  workers.start({ input }, input.length)
})

test('double 10 numbers with 11 workers', (done) => {
  const workers = new Parallel(testWorker, (result) => {
    expect(result).toStrictEqual(doubled)
    done()
  }, { numberOfWorkers: 11 })
  workers.start({ input }, input.length)
})

test('double a typed array with 4 workers', (done) => {
  const workers = new Parallel(
    testWorker,
    (result) => {
      expect(result).toStrictEqual(Int32Array.from(doubled))
      done()
    },
    { numberOfWorkers: 4, ArrayConstructor: Int32Array },
  )
  workers.start({ input: Int32Array.from(input) }, input.length)
})

test('catch an error with an error handler', (done) => {
  const resultHandler = jest.fn(() => {
    expect(resultHandler).not.toBeCalled()
  })
  const mockErrorHandler = jest.fn(() => {
    expect(mockErrorHandler.mock.calls.length).toBe(1)
    expect(mockErrorHandler.mock.calls[0][0]).toBe(TEST_ERROR)
    done()
  })

  const workers = new Parallel(
    failWorker,
    resultHandler,
    { numberOfWorkers: 4, onError: mockErrorHandler },
  )
  workers.start({ input: Int32Array.from(input) }, input.length)
})

test('set number of workers to number of logical processors', () => {
  const workers = new Parallel(testWorker, () => {})
  expect(workers.threads).toBe(globalThis.navigator.hardwareConcurrency)
})

test('set number of workers by configuration', () => {
  const workers = new Parallel(testWorker, () => {}, { numberOfWorkers: 15 })
  expect(workers.threads).toBe(15)
})

test('get defaults', () => {
  expect(Parallel.DEFAULTS).toStrictEqual({
    // handler for errors, console by default
    // eslint-disable-next-line no-console
    onError: console.error,
    // how much workers will be spawned, number of logical processors by default
    numberOfWorkers: globalThis.navigator.hardwareConcurrency,
    // type of array to be returned from parallel1d and workers
    ArrayConstructor: Array,
  })
})

test('terminate workers', () => {
  const numberOfWorkers = 5
  const neverEnding = new Set()
  function messageHandler() {
    neverEnding.add(setTimeout(this.postMessageMock, 1000000))
  }
  const terminateHandler = jest.fn(() => {
    neverEnding.forEach(clearTimeout)
  })
  const terminateWorker = mockWorker(messageHandler, terminateHandler)

  const workers = new Parallel(terminateWorker, () => {}, { numberOfWorkers })
  workers.start({ input }, input.length)
  workers.terminate()
  expect(terminateHandler.mock.calls.length).toBe(numberOfWorkers)
})

module.exports = { testWorker }
