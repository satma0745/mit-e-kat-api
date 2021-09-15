import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

interface IUserCredentials {
  readonly username?: string
  readonly password?: string
}

@Entity('users')
class User implements IUserCredentials {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 20, unique: true })
  username: string

  @Column({ length: 20 })
  password: string

  constructor({ username, password }: IUserCredentials = {}) {
    this.username = username
    this.password = password
  }
}

export { User }
