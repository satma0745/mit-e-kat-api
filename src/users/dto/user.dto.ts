import { ApiProperty } from '@nestjs/swagger'

interface IUserInfo {
  readonly id: number
  readonly username: string
}

class UserDto implements IUserInfo {
  @ApiProperty({ example: 745 })
  readonly id: number

  @ApiProperty({ example: 'qwerty' })
  readonly username: string

  constructor({ id, username }: IUserInfo) {
    this.id = id
    this.username = username
  }
}

export { UserDto }
