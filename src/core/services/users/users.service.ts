import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from '@core/entities'

import {
  GetUsersRequest,
  GetUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from './users.requests'

@Injectable()
class UsersService {
  private readonly usersRepository: Repository<User>

  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    this.usersRepository = usersRepository
  }

  async registerNewUser({ username, password }: RegisterUserRequest) {
    const user = this.usersRepository.create({ username, password })
    await this.usersRepository.save(user)
  }

  getUsers({}: GetUsersRequest) {
    return this.usersRepository.find()
  }

  async getUser({ id }: GetUserRequest) {
    return this.usersRepository.findOne(id)
  }

  async updateUser({ id, username, password }: UpdateUserRequest) {
    const user = await this.usersRepository.findOne(id)

    user.username = username
    user.password = password

    await this.usersRepository.save(user)
  }

  async deleteUser({ id }: DeleteUserRequest) {
    await this.usersRepository.delete(id)
  }
}

export { UsersService }
