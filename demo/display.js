const PRINT_LIMIT = 10

const benchmarkResults = document.getElementById('benchmark-results')

function print (text) {
  benchmarkResults.innerText += `${text}\n`
}

function printArray (name, array) {
  print(`${name} = [${array.slice(0, PRINT_LIMIT).join(', ')}, ...]`)
}

function printCalculationTime (time) {
  print(`Calculation time: ${time} ms\n`)
}

function startQueue () {
  const wrapped = []

  for (let i = 0; i < arguments.length; i++) {
    wrapped[i] = (passedResult) => {
      setTimeout(() => {
        arguments[i](i === arguments.length - 1 ? () => void 0 : (result) => {
          wrapped[i + 1](result)
        }, passedResult)
      })
    }
  }

  wrapped[0]()
}

module.exports = { startQueue, print, printArray, printCalculationTime }
