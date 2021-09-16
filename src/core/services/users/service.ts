import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Not, Repository } from 'typeorm'

import { User } from '@core/entities'
import { conflict, notFound, success } from '@core/responses'

import { GetUsersRequest, GetUserRequest, RegisterUserRequest, UpdateUserRequest, DeleteUserRequest } from './requests'

@Injectable()
class UsersService {
  constructor(@InjectRepository(User) private readonly repository: Repository<User>) {}

  async registerNewUser({ username, password }: RegisterUserRequest) {
    // check if username already taken by someone else
    const count = await this.repository.count({ where: { username } })
    if (count > 0) {
      return conflict()
    }

    const user = this.repository.create({ username, password })
    await this.repository.save(user)
    return success()
  }

  async getUsers({}: GetUsersRequest) {
    const users = await this.repository.find()
    return success(users)
  }

  async getUser({ id }: GetUserRequest) {
    const user = await this.repository.findOne(id)
    return user !== undefined ? success(user) : notFound()
  }

  async updateUser({ id, username, password }: UpdateUserRequest) {
    const user = await this.repository.findOne(id)
    if (user === undefined) {
      return notFound()
    }

    // check if new username already taken by someone else
    // note that user may not update his username (username will be taken by himself)
    const count = await this.repository.count({ where: { id: Not(id), username } })
    if (count > 0) {
      return conflict()
    }

    user.username = username
    user.password = password

    await this.repository.save(user)
    return success()
  }

  async deleteUser({ id }: DeleteUserRequest) {
    const { affected } = await this.repository.delete(id)
    return affected > 0 ? success() : notFound()
  }
}

export { UsersService }
