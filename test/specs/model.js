import savor from 'savor'
import { User, Token } from '../..'

savor.add("should create a simple User", (context, done) => {
  const user = new User({
    username: "username",
    email: "email",
    firstName: "firstName",
    lastName: "lastName",
    phone: "phone"
  })

  context.expect(user).to.exist
  context.expect(user.data).to.exist
  context.expect(user.username).to.equal('username')
  context.expect(user.email).to.equal('email')
  context.expect(user.firstName).to.equal('firstName')
  context.expect(user.lastName).to.equal('lastName')
  context.expect(user.phone).to.equal('phone')
  context.expect(user.fullName).to.equal('firstName lastName')

  done()
}).

add("should create a simple Token", (context, done) => {
  const token = new Token({
    access_token: "access_token",
    token_type: "token_type",
    expires_in: "expires_in",
    scope: "scope"
  })

  context.expect(token).to.exist
  context.expect(token.data).to.exist
  context.expect(token.key).to.equal('access_token')
  context.expect(token.type).to.equal('token_type')
  context.expect(token.expiration).to.equal('expires_in')
  context.expect(token.scope).to.equal('scope')

  done()
}).

run("Data Model")
