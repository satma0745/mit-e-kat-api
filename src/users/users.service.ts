import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { RegisterUserDto } from './dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
class UsersService {
  private readonly usersRepository: Repository<User>

  constructor(@InjectRepository(User) usersRepository: Repository<User>) {
    this.usersRepository = usersRepository
  }

  async registerNewUser(registerUserDto: RegisterUserDto) {
    const user = this.usersRepository.create(registerUserDto)
    await this.usersRepository.save(user)
  }

  getAllUsers() {
    return this.usersRepository.find()
  }

  getSingleUser(id: string) {
    return this.usersRepository.findOne(id)
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.usersRepository.findOne(id)

    user.username = updateUserDto.username
    user.password = updateUserDto.password

    await this.usersRepository.save(user)
  }

  async deleteUser(id: string) {
    await this.usersRepository.delete(id)
  }
}

export { UsersService }
