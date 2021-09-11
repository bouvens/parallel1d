const { isSimple } = require('./synchronous')

onmessage = function simpleWorker({ data: { input, from, to } }) {
  const result = []

  for (let i = from; i < to; i++) {
    const n = input[i]

    result.push(isSimple(n))
  }

  postMessage(result)
}
