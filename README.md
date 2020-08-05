# Parallel1d
[![npm][npm-badge]][npm] [![npm][npm-dt-badge]][npm] [![GitHub issues][issues-badge]][issues]

A light helper for parallel calculations on one-dimensional arrays. Web workers are alternative here for Array.map method.

## [Demo and comparsion](https://bouvens.github.io/parallel1d/)

You can see a live demo at <img src="https://raw.githubusercontent.com/bouvens/parallel1d/master/demo/favicon.png" width=16 height=16> [https://bouvens.github.io/parallel1d/](https://bouvens.github.io/parallel1d/)
The source code of this demo is available in [the repository](https://github.com/bouvens/parallel1d/tree/master/demo).

Example of usage: <img src="https://raw.githubusercontent.com/bouvens/griffeath-machine/4e27f6f5df4c6cc77c96ab2e3545cbdc1da0a433/img/favicon.png" width=16 height=16> [Griffeath's machine](https://bouvens.github.io/griffeath-machine/#/workers).

## Usage

Run in a console:
```bash
npm i parallel1d
```

Web worker needs an external file as a browsers limitation. Web worker always gets data property in `onmessage` function. Parallel1d will also add `from` and `to` properties to divide work.
```javascript
/**
 * sample.worker.js
 */

// just one calculation function for example
function double (n) {
  return n * 2
}

// it gets passed options for worker, `from` and `to`
onmessage = function ({ data: { input, from, to } }) {
  const result = []

  for (let j = from; j < to; j++) {
    const n = input[j]

    result.push(double(n))
  }

  postMessage(result)
}
```

A worker returns the resulting array through the `postMessage` function.

The worker may be imported just by `const myWorker = new Worker('sample.worker.js')`, or with [worker-loader](https://www.npmjs.com/package/worker-loader) in case of using Webpack.

```javascript
/**
 * index.js
 */

import Parallel from 'parallel1d'
import SampleWorker from 'worker-loader!./sample.worker.js'

const someNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// pass worker constructor and callback to process resulting array
const workers = new Parallel(SampleWorker, console.log)
// pass any options for worker and length of array to divide it to workers
workers.start({ input: someNumbers }, someNumbers.length)
// console: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

That's it.

### Options

Besides worker constructor and callback to process resulting array parallel1d constructor accepts options:
```javascript
const workers = new Parallel(SampleWorker, console.log, {
  // handler for errors, console by default
  handleError: console.error,
  // how much workers will be spawned, number of logical processors by default
  numberOfWorkers: navigator.hardwareConcurrency,
  // type of array to be returned from parallel1d and workers
  // may be typed array like Int32Array and Uint8ClampedArray, usual array by default
  ArrayConstructor: Array,
})

// get numberOfWorkers
console.log(workers.threads)
```
Get the `numberOfWorkers` set in options or by default from a `threads` property.

### Terminating
If you need to stop all workers immediately, call:
```javascript
workers.terminate()
```

## Just 401 byte

Size and times are defined with [size-limit](https://www.npmjs.com/package/size-limit):
```
  Package size: 419 B with all dependencies, minified and gzipped
  Loading time: 10 ms on slow 3G
  Running time: 45 ms on Snapdragon 410
  Total time:   55 ms
```

## How to run demo locally

Run in a console:
```bash
git clone git@github.com:bouvens/parallel1d.git
cd parallel1d
yarn
yarn run start
```

For sure, you can use `npm` instead of `yarn`.

[npm-badge]: https://img.shields.io/npm/v/parallel1d.png?style=flat-square
[npm]: https://www.npmjs.com/package/parallel1d

[npm-dt-badge]: https://img.shields.io/npm/dt/parallel1d.png?style=flat-square

[issues-badge]: https://img.shields.io/github/issues/bouvens/parallel1d.svg?style=flat-square
[issues]: https://github.com/bouvens/parallel1d/issues
