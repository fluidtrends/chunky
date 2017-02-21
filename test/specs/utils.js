import savor from 'savor'
import { Utils } from '../..'

savor.add("should log messages", (context, done) => {
  // We don't want to polute the test output
  context.stub(console, 'log', () => {})

  var output = Utils.log("hello")
  context.expect(output.indexOf("hello")).to.be.above(0)
  output = Utils.log("hello", 'error')
  context.expect(output.indexOf("hello")).to.be.above(0)
  output = Utils.log("hello", 'ok')
  context.expect(output.indexOf("hello")).to.be.above(0)
  output = Utils.log("hello", 'warning')
  context.expect(output.indexOf("hello")).to.be.above(0)

  // Restore the console
  console.log.restore()
  done()
}).

add("should trigger a timeout", (context, done) => {
  global.setTimeout = (callback, ms) => callback()
  savor.promiseShouldFail(Utils.timeout(1000, Promise.resolve('test')), done, (error) => context.expect(error).to.exist)
}).

add("should base64 encode a value", (context, done) => {
  const value = Utils.encodeBase64("hello")
  context.expect(value).to.equal('aGVsbG8=')
  done()
}).

add("should decode a base64 value", (context, done) => {
  const value = Utils.decodeBase64("aGVsbG8=")
  context.expect(value).to.equal('hello')
  done()
}).

run("Utils")
