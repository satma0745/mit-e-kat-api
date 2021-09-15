import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { User } from './db'
import { UsersController } from './api'
import { UsersService } from './core'

@Module({
  imports: [TypeOrmModule.forRoot(), TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService],
})
class App {}

export { App }
