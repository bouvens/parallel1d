const { factorial } = require('./synchronous')

onmessage = function factorialWorker({ data: { input, from, to } }) {
  const result = []

  for (let i = from; i < to; i++) {
    const n = input[i]

    result.push(factorial(n))
  }

  postMessage(result)
}
