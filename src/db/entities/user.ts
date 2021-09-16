import { EntitySchema } from 'typeorm'
import { User } from '@core/entities'

const UserEntity = new EntitySchema<User>({
  name: 'User',
  target: User,
  tableName: 'users',
  columns: {
    id: {
      type: String,
      primary: true,
      generated: 'uuid',
    },
    username: {
      type: String,
      length: 20,
      unique: true,
    },
    password: {
      type: String,
      length: 20,
    },
  },
})

export { UserEntity }
