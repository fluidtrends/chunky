import savor from 'react-savor'
import { DefaultDataClient, Errors } from '../..'
import { AuthChunk, UsersChunk } from '../..'

savor.add("should create an auth chunk", (context, done) => {
  // const chunk = new AuthChunk()
  // context.expect(chunk.name).to.equal('auth')

  done()
}).

add("should create a users chunk", (context, done) => {
  // const chunk = new UsersChunk()
  // context.expect(chunk.name).to.equal('users')

  done()
}).

run("Chunks")
