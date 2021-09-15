import { IsNotEmpty, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

class RegisterUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @Length(6, 20, { message: 'Username must be between 6 and 20 characters long.' })
  @ApiProperty({ minLength: 6, maxLength: 20, example: 'qwerty' })
  readonly username: string

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters long.' })
  @ApiProperty({ minLength: 6, maxLength: 20, example: 'password' })
  readonly password: string
}

class UpdateUserDto {
  @IsNotEmpty({ message: 'Username is required' })
  @Length(6, 20, { message: 'Username must be between 6 and 20 characters long.' })
  @ApiProperty({ minLength: 6, maxLength: 20, example: 'qwerty' })
  readonly username: string

  @IsNotEmpty({ message: 'Password is required' })
  @Length(6, 20, { message: 'Password must be between 6 and 20 characters long.' })
  @ApiProperty({ minLength: 6, maxLength: 20, example: 'password' })
  readonly password: string
}

class UserDto {
  @ApiProperty({ example: '07450745-0745-0745-0745-074507450745' })
  readonly id: string

  @ApiProperty({ example: 'qwerty' })
  readonly username: string

  constructor({ id, username }: { id: string; username: string }) {
    this.id = id
    this.username = username
  }
}

export { RegisterUserDto, UpdateUserDto, UserDto }
