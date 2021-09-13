globalThis = {
  navigator: {
    hardwareConcurrency: 8,
  },
}

const Parallel = require('../promisified')
const { testWorker } = require('./index.test')

let input
let doubled

beforeEach(() => {
  input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  doubled = [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
})

test('double 10 numbers with 4 workers', async () => {
  const result = await Parallel(testWorker, { input }, input.length, { numberOfWorkers: 4 })
  expect(result).toStrictEqual(doubled)
})

test('double a typed array with 8 workers', async () => {
  const result = await Parallel(
    testWorker,
    { input: Int32Array.from(input) },
    input.length,
    { numberOfWorkers: 8, ArrayConstructor: Int32Array },
  )
  expect(result).toStrictEqual(Int32Array.from(doubled))
})
