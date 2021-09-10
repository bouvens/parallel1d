const { isSimple } = require('./synchronous')

onmessage = function simpleWorker({ data: { input, from, to } }) {
  const result = []

  for (let j = from; j < to; j++) {
    const n = input[j]

    result.push(isSimple(n))
  }

  postMessage(result)
}
