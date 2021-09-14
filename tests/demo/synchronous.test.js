const { factorial } = require('../../demo/synchronous')

test('calculate factorial of 0', () => {
  expect(factorial(0)).toBe(1n)
})

test('calculate factorial of 1', () => {
  expect(factorial(1)).toBe(1n)
})

test('calculate factorial of 2', () => {
  expect(factorial(2)).toBe(2n)
})

test('calculate factorial of 10', () => {
  expect(factorial(10)).toBe(3628800n)
})
