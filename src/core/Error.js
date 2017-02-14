export default class ChunkyError extends Error {

  constructor(message) {
    super()

    this.message   = `[Chunky Error] ${message}`
    this.stack     = (new Error()).stack
    this.name      = 'Chunky'
  }

  get isChunkyError() {
    return this.name === 'Chunky'
  }
}
