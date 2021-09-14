import { Injectable } from '@nestjs/common'

import { RegisterUserDto } from './dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
class UsersService {
  private _users: User[] = []

  registerNewUser(registerUserDto: RegisterUserDto) {
    const user = new User(registerUserDto)
    this._users.push(user)
  }

  getAllUsers() {
    return this._users
  }

  getSingleUser(id: number) {
    return this._users.find((user) => user.id === id)
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = this._users.find((user) => user.id === id)
    user.updateCredentials(updateUserDto)
  }

  deleteUser(id: number) {
    this._users = this._users.filter((user) => user.id !== id)
  }
}

export { UsersService }
