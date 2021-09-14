import { ApiProperty } from '@nestjs/swagger'

class RegisterUserDto {
  @ApiProperty({ example: 'qwerty' })
  readonly username: string

  @ApiProperty({ example: 'password' })
  readonly password: string
}

export { RegisterUserDto }
