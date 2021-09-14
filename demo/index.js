const {
  clear,
  print,
  printArray,
  printCalculationTime,
  restartButton,
  showStart,
  showEnd,
} = require('./display')
const { generateInput, factorial } = require('./synchronous')
const parallel = require('../promisified')
const { DEFAULTS } = require('..')
const FactorialWorker = require('./factorial.worker').default

const INPUT_MAX = 300
const INPUT_LENGTH = 50000

const sleep = (ms) => new Promise((resolve) => { setTimeout(resolve, ms) })

async function startQueue() {
  await sleep(0)

  let start = new Date()
  const input = generateInput(INPUT_MAX, INPUT_LENGTH) // heavy function
  printArray('input', input)
  print(`Generation time: ${new Date() - start} ms\n`)

  await sleep(700)

  start = new Date()
  const syncRunResult = input.map(factorial) // heavy function
  const syncTime = new Date() - start
  printArray('synchronous factorials calculating', syncRunResult)
  printCalculationTime(syncTime)

  await sleep(700)

  start = new Date()
  print(`Start ${DEFAULTS.numberOfWorkers} workers`)
  const result = await parallel(FactorialWorker, { input }, input.length)
  const asyncTime = new Date() - start
  printArray('web workers factorials calculating', result)
  printCalculationTime(asyncTime)

  const timesFaster = Math.round((syncTime / asyncTime) * 10) / 10
  print(`Parallel calculations were ~${timesFaster} times faster.`)
  showEnd()
}

function benchmark() {
  showStart()
  clear()

  print(`There'll be ${INPUT_LENGTH.toLocaleString('en-US')} numbers in range 1–${
    INPUT_MAX.toLocaleString('en-US')} in the original array. It will be calculated in BigNum and converted to Number for display.\n`)

  startQueue()
}

restartButton.addEventListener('click', benchmark)

benchmark()
