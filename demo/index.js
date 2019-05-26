const Parallel = require('../')

const INPUT_MAX = 100
const INPUT_LENGTH = 10000000
const PRINT_LIMIT = 5

function generateInput (max, length) {
  const data = []

  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * max) + 1)
  }

  return data
}

function slowFactorial (n) {
  let factorial = 1

  for (let i = 1; i <= n; i++) {
    factorial *= i
  }

  return factorial
}

function startQueue () {
  const wrapped = []

  for (let i = 0; i < arguments.length; i++) {
    wrapped[i] = (passedResults) => {
      setTimeout(() => {
        let result = arguments[i](passedResults)
        if (i !== arguments.length - 1) {
          wrapped[i + 1](result)
        }
      })
    }
  }

  wrapped[0]()
}

function synchronousRun (input, processor) {
  return input.map(processor)
}

const benchmark = document.getElementById('benchmark-results')
function print (text) {
  benchmark.innerText += `${text}\n`
}

function printArray (name, array) {
  print(`${name} = [${array.slice(0, PRINT_LIMIT).join(', ')}, ...]\n`)
}

print(`There'll be ${INPUT_LENGTH.toLocaleString('en-US')} elements in every array.
Calculating...\n`)
startQueue(
  () => {
    let input = generateInput(INPUT_MAX, INPUT_LENGTH) // heavy function
    printArray('input', input)
    return input
  },
  (input) => {
    const syncRunResult = synchronousRun(input, slowFactorial) // heavy function
    printArray('synchronous run of factorial', syncRunResult)
    return input
  },
  () => {
    print(`Done.`)
  },
)
