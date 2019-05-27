const {
  startQueue,
  clear,
  print,
  printArray,
  printCalculationTime,
  restartButton,
  showStart,
  showEnd,
} = require('./display')
const { generateInput, isSimple } = require('./synchronous')
const Parallel = require('../')
const SlowFactorialWorker = require('./simple.worker')

const INPUT_MAX = 50000
const INPUT_LENGTH = 1000000

function benchmark() {
  showStart()
  clear()

  print(`There'll be ${INPUT_LENGTH.toLocaleString('en-US')} numbers in range 1–${
    INPUT_MAX.toLocaleString('en-US')} in original array.\n`)

  startQueue(
    (resolve) => {
      const start = new Date()
      let input = generateInput(INPUT_MAX, INPUT_LENGTH) // heavy function
      printArray('input', input)
      print(`Generation time: ${new Date() - start} ms\n`)
      resolve(input)
    },
    (resolve, input) => {
      const start = new Date()
      const syncRunResult = input.map(isSimple) // heavy function
      const syncTime = new Date() - start
      printArray('synchronous simplicity checking', syncRunResult)
      printCalculationTime(syncTime)
      resolve({ input, syncTime })
    },
    (resolve, { input, syncTime }) => {
      const start = new Date()
      const workers = new Parallel(SlowFactorialWorker, (result) => {
        resolve({ result, syncTime, start })
      })
      workers.start({ input }, input.length)
    },
    (resolve, { result, syncTime, start }) => {
      const asyncTime = new Date() - start
      printArray('web workers simplicity checking', result)
      printCalculationTime(asyncTime)
      const timesFaster = Math.round(syncTime / asyncTime * 10) / 10
      print(`Parallel calculations were ~${timesFaster} times faster.`)
      showEnd()
    },
  )
}

restartButton.addEventListener('click', benchmark)

benchmark()
