import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'

@Module({
  imports: [UsersModule],
})
class AppModule {}

export { AppModule }
