# Parallel 1D

[![npm][npm-badge]][npm] [![npm][npm-dt-badge]][npm] [![GitHub issues][issues-badge]][issues]

A light helper for parallel calculations on one-dimensional arrays. Web workers are alternative here for
Array.map method.

## [Demo and Comparsion](https://bouvens.github.io/parallel1d/)

You can see a live demo
at <img src="https://raw.githubusercontent.com/bouvens/parallel1d/master/demo/favicon.png" width=16 height=16> [https://bouvens.github.io/parallel1d/](https://bouvens.github.io/parallel1d/)
The source code of this demo is available
in [the repository](https://github.com/bouvens/parallel1d/tree/master/demo).

Example of
usage: <img src="https://raw.githubusercontent.com/bouvens/griffeath-machine/4e27f6f5df4c6cc77c96ab2e3545cbdc1da0a433/img/favicon.png" width=16 height=16> [Griffeath's Machine](https://bouvens.github.io/griffeath-machine/#/workers)
.

## Usage

Run in a project root to install the package

```bash
npm i parallel1d
```

Web worker needs an external file as a browsers limitation. Web worker always gets data property
in `onmessage` function. Parallel 1D will also add `from` and `to` properties to divide work.

```javascript
/**
 * mock.worker.js
 */

// just one calculation function for example
function double(n) {
  return n * 2
}

// it gets passed options for worker (i.e. `input`), and special props `from` and `to`
onmessage = function ({ data: { input, from, to } }) {
  const result = []

  for (let i = from; i < to; i++) {
    const n = input[i]

    result.push(double(n))
  }

  postMessage(result)
}
```

A worker should return the resulting array through the `postMessage` function.

The worker may be imported just by `const myWorker = new Worker('mock.worker.js')`, or
with [worker-loader](https://www.npmjs.com/package/worker-loader) in case of using Webpack.

```javascript
/**
 * index.js
 */

import SampleWorker from 'worker-loader!./mock.worker.js'
```

You can run it as promise if we don't need to run the same workers with different data

```javascript
import parallel from 'parallel1d/promisified'

const someNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

async function runWorkers() {
  const result = await parallel(SampleWorker, { input: someNumbers }, someNumbers.length)
  // it's possible to pass options as the 4th argument, check the Options section below
}
```

Or you can use the older approach

```javascript
import Parallel from 'parallel1d'

const someNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
// pass worker constructor and callback to process resulting array
const workers = new Parallel(SampleWorker, console.log)
// pass any options for worker and length of array to divide it to workers
workers.start({ input: someNumbers }, someNumbers.length)

// You will see in console as result: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
```

### Options

We can pass options as the 4th argument to a promisified version

```javascript
const options = {
  // handler for errors, console by default
  onError: console.error,
  // how much workers will be spawned, number of logical processors by default or 4 if undefined
  numberOfWorkers: navigator.hardwareConcurrency || 4,
  // type of array to be returned from parallel1d and workers
  // may be typed array like Int32Array or Uint8ClampedArray, Array by default
  ArrayConstructor: Array,
}

await parallel(SampleWorker, { input }, input.length, options)

// Besides worker constructor and callback to process resulting array parallel1d constructor accepts options as well
const workers = new Parallel(SampleWorker, console.log, options)
```

### Getting Info

```javascript
import Parallel from 'parallel1d'

// Get and check defaults without calling constructor with `new`
console.log('Defaults:', Parallel.DEFAULTS)

const workers = new Parallel(SampleWorker, console.log)

// Get the `numberOfWorkers` set in options or by default from a `threads` property
console.log('Threads number:', workers.threads)

// Get is it already started or no?
console.log(workers.working ? 'Work in progress' : 'We need to start it first')
```

### Terminating

If you need to stop all workers immediately, call:

```javascript
// the callback argument will be called after termination of workers
workers.terminate(callback)
```

## Small Size

With all (0) dependencies, minified and gzipped:

* `require('parallel1d')` 505 B
* `require('parallel1d/promisified')` 550 B

## How to Run the Demo Locally

Run in a console:

```bash
git clone git@github.com:bouvens/parallel1d.git
cd parallel1d
npm install
npm run start
```

[npm-badge]: https://img.shields.io/npm/v/parallel1d.png?style=flat-square

[npm]: https://www.npmjs.com/package/parallel1d

[npm-dt-badge]: https://img.shields.io/npm/dt/parallel1d.png?style=flat-square

[issues-badge]: https://img.shields.io/github/issues/bouvens/parallel1d.svg?style=flat-square

[issues]: https://github.com/bouvens/parallel1d/issues
