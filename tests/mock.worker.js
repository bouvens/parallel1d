module.exports = (onmessage, terminate = () => {}) => class workerMock {
  constructor() {
    this.listeners = {}
    this.onmessage = onmessage
    this.terminate = terminate
  }

  addEventListener(eventName, cb) {
    this.listeners[eventName] = cb
  }

  postMessageMock(data) {
    if (typeof this.listeners.message === 'function') {
      this.listeners.message({ data })
    }
  }

  postErrorMock(e) {
    if (typeof this.listeners.error === 'function') {
      this.listeners.error(e)
    }
  }

  postMessage(data) {
    this.onmessage({ data })
  }
}
