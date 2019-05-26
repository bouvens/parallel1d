function isSimple (n) {
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (!(n % i)) {
      return false
    }
  }

  return true
}

onmessage = function ({ data: { input, from, to } }) {
  const result = []

  for (let j = from; j < to; j++) {
    const n = input[j]

    result.push(isSimple(n))
  }

  postMessage(result)
}
