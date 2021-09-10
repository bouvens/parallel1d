const PRINT_LIMIT = 10

const benchmarkResults = document.getElementById('benchmark-results')
const restartButton = document.getElementById('restart')
const loader = document.getElementById('loader')
const hiddenClass = 'hidden'

function clear() {
  benchmarkResults.innerText = ''
}

function print(text) {
  benchmarkResults.innerText += `${text}\n`
}

function printArray(name, array) {
  print(`${name} = [${array.slice(0, PRINT_LIMIT).join(', ')}, ...]`)
}

function printCalculationTime(time) {
  print(`Calculation time: ${time} ms\n`)
}

// TODO rewrite it to promises instead of callbacks even it small demo loafer
function startQueue(...queue) {
  const wrapped = []

  queue.forEach((func, i) => {
    wrapped[i] = (passedResult) => {
      setTimeout(() => {
        func(i === arguments.length - 1 ? () => undefined : (result) => {
          wrapped[i + 1](result)
        }, passedResult)
      })
    }
  })

  wrapped[0]()
}

function showStart() {
  restartButton.disabled = true
  loader.classList.remove(hiddenClass)
}

function showEnd() {
  restartButton.disabled = false
  loader.classList.add(hiddenClass)
}

module.exports = {
  startQueue,
  clear,
  print,
  printArray,
  printCalculationTime,
  restartButton,
  showStart,
  showEnd,
}
