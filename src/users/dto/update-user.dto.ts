import { ApiProperty } from '@nestjs/swagger'

class UpdateUserDto {
  @ApiProperty({ example: 'qwerty' })
  readonly username: string

  @ApiProperty({ example: 'password' })
  readonly password: string
}

export { UpdateUserDto }
