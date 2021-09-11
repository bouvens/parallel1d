const {
  clear,
  print,
  printArray,
  printCalculationTime,
  restartButton,
  showStart,
  showEnd,
} = require('./display')
const { generateInput, isSimple } = require('./synchronous')
const parallel = require('../promisified')
const { DEFAULTS } = require('..')
const CheckSimplicityWorker = require('./simple.worker').default

const INPUT_MAX = 100000
const INPUT_LENGTH = 100000

async function startQueue() {
  let start = new Date()
  const input = generateInput(INPUT_MAX, INPUT_LENGTH) // heavy function
  printArray('input', input)
  print(`Generation time: ${new Date() - start} ms\n`)

  start = new Date()
  const syncRunResult = input.map(isSimple) // heavy function
  const syncTime = new Date() - start
  printArray('synchronous simplicity checking', syncRunResult)
  printCalculationTime(syncTime)

  start = new Date()
  print(`Start ${DEFAULTS.numberOfWorkers} workers`)
  const result = await parallel(CheckSimplicityWorker, { input }, input.length)
  const asyncTime = new Date() - start
  printArray('web workers simplicity checking', result)
  printCalculationTime(asyncTime)

  const timesFaster = Math.round((syncTime / asyncTime) * 10) / 10
  print(`Parallel calculations were ~${timesFaster} times faster.`)
  showEnd()
}

function benchmark() {
  showStart()
  clear()

  print(`There'll be ${INPUT_LENGTH.toLocaleString('en-US')} numbers in range 1–${
    INPUT_MAX.toLocaleString('en-US')} in the original array.\n`)

  startQueue()
}

restartButton.addEventListener('click', benchmark)

benchmark()
