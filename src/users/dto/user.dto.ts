import { ApiProperty } from '@nestjs/swagger'

interface IUserInfo {
  readonly id: string
  readonly username: string
}

class UserDto implements IUserInfo {
  @ApiProperty({ example: '07450745-0745-0745-0745-074507450745' })
  readonly id: string

  @ApiProperty({ example: 'qwerty' })
  readonly username: string

  constructor({ id, username }: IUserInfo) {
    this.id = id
    this.username = username
  }
}

export { UserDto }
