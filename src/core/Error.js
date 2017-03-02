export default class ChunkyError extends Error {

  constructor(message) {
    super()

    this.message   = message
    this.stack     = (new Error()).stack
    this.name      = 'Chunky'
  }

}
