function generateInput (max, length) {
  const data = []

  for (let i = 0; i < length; i++) {
    data.push(Math.floor(Math.random() * max) + 1)
  }

  return data
}

function isSimple (n) {
  for (let i = 2; i <= n; i++) {
    if (!(n % i)) {
      return false
    }
  }

  return true
}

module.exports = { generateInput, isSimple }
