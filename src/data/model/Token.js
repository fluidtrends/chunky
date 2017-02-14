export default class Token {

  constructor(data) {
    this._data = data
  }

  get data () {
    return this._data
  }

  get key () {
    return this.data.access_token
  }

  get type () {
    return this.data.token_type
  }

  get expiration () {
    return this.data.expires_in
  }

  get scope () {
    return this.data.scope
  }
}
