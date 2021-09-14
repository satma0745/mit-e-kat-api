let nextId = 0
const generateId = () => {
  const id = nextId
  nextId += 1
  return id
}

interface IUserCredentials {
  readonly username: string
  readonly password: string
}

class User implements IUserCredentials {
  private readonly _id: number
  private _username: string
  private _password: string

  public get id() {
    return this._id
  }

  public get username() {
    return this._username
  }

  public get password() {
    return this._password
  }

  constructor({ username, password }: IUserCredentials) {
    this._id = generateId()

    this._username = username
    this._password = password
  }

  updateCredentials({ username, password }: IUserCredentials) {
    this._username = username
    this._password = password
  }
}

export { User }
