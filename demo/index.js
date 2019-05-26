const { startQueue, print, printArray, printCalculationTime } = require('./display')
const { generateInput, isSimple } = require('./synchronous')
const Parallel = require('../')
const SlowFactorialWorker = require('./simple.worker')

const INPUT_MAX = 50000
const INPUT_LENGTH = 1000000

print(`There'll be ${INPUT_LENGTH.toLocaleString('en-US')} numbers in range 1–${
  INPUT_MAX.toLocaleString('en-US')} in original array.
Calculating...\n`)

let start
let syncTime
let asyncTime

startQueue(
  (resolve) => {
    start = new Date()
    let input = generateInput(INPUT_MAX, INPUT_LENGTH) // heavy function
    printArray('input', input)
    print(`Generation time: ${new Date() - start} ms\n`)
    resolve(input)
  },
  (resolve, input) => {
    start = new Date()
    const syncRunResult = input.map(isSimple) // heavy function
    syncTime = new Date() - start
    printArray('synchronous simplicity checking', syncRunResult)
    printCalculationTime(syncTime)
    resolve(input)
  },
  (resolve, input) => {
    start = new Date()
    const workers = new Parallel(SlowFactorialWorker, resolve)
    workers.initialize() // TODO add queue
    workers.start({ input }, input.length)
  },
  (resolve, result) => {
    asyncTime = new Date() - start
    printArray('web workers simplicity checking', result)
    printCalculationTime(asyncTime)
    const timesFaster = Math.trunc(syncTime / asyncTime * 100) / 100
    print(`Parallel calculations were ~${timesFaster} times faster.`)
    print(`--------`)
  },
)
