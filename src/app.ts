import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UserEntity } from './db'
import { UsersController } from './api'
import { UsersService } from './core'

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService],
})
class App {}

export { App }
