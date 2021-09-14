function generateInput(max, length) {
  const data = []

  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * max) + 1)
  }

  return data
}

function factorial(n) {
  let result = 1n

  for (let i = 2n; i <= n; i++) {
    result *= i
  }

  return result
}

module.exports = { generateInput, factorial }
