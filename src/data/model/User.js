export default class User {

  constructor(data) {
    this._data = data
  }

  get data () {
    return this._data
  }

  get username () {
    return this.data.username
  }

  get email () {
    return this.data.email
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }

  get firstName () {
    return this.data.firstName
  }

  get lastName () {
    return this.data.lastName
  }

  get phone () {
    return this.data.phone
  }

}
