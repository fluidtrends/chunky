/* eslint-disable no-unused-expressions */

import savor from 'react-savor'
import { Core, Errors } from '../../../src'

savor.add('should be able to initialize providers without options', (context, done) => {
  const provider = new Core.DataProvider()
  context.expect(provider.props).to.be.empty
  done()
})

.add('should be able to initialize providers with options', (context, done) => {
  const provider = new Core.DataProvider({ hello: 'world' })
  context.expect(provider.props.hello).to.equal('world')
  done()
})

.add('should not be able to fetch an optionless operation', (context, done) => {
  const provider = new Core.DataProvider()

  savor.promiseShouldFail(provider.operation(), done, (error) =>
        context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not be able to fetch a typeless operation', (context, done) => {
  const provider = new Core.DataProvider()

  savor.promiseShouldFail(provider.operation({}), done, (error) =>
        context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.add('should not be able to fetch an unknown operation', (context, done) => {
  const provider = new Core.DataProvider()

  savor.promiseShouldFail(provider.operation({ type: 'dummy' }), done, (error) =>
        context.expect(error.message).to.equal(Errors.UNDEFINED_OPERATION().message))
})

.run('[Core] Data Provider')
