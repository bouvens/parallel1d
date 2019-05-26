onmessage = function slowFactorial ({ data: { input, from, to } }) {
  const result = []

  for (let j = from; j < to; j++) {
    const n = input[j]
    let factorial = 1

    for (let i = 1; i <= n; i++) {
      factorial *= i
    }

    result.push(factorial)
  }

  postMessage(result)
}
