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
  print(`${name} = [${array.slice(0, PRINT_LIMIT).map(Number).join(', ')}, ...]`)
}

function printCalculationTime(time) {
  print(`Calculation time: ${time} ms\n`)
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
  clear,
  print,
  printArray,
  printCalculationTime,
  restartButton,
  showStart,
  showEnd,
}
