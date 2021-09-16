class GetUsersRequest {}

class GetUserRequest {
  constructor(readonly id: string) {}
}

class RegisterUserRequest {
  readonly username: string
  readonly password: string

  constructor({ username, password }: { username: string; password: string }) {
    this.username = username
    this.password = password
  }
}

class UpdateUserRequest {
  readonly username: string
  readonly password: string

  constructor(readonly id: string, { username, password }: { username: string; password: string }) {
    this.username = username
    this.password = password
  }
}

class DeleteUserRequest {
  constructor(readonly id: string) {}
}

export { GetUsersRequest, GetUserRequest, RegisterUserRequest, UpdateUserRequest, DeleteUserRequest }
