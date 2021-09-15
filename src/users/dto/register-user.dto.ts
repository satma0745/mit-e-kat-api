import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Length } from 'class-validator'

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

export { RegisterUserDto }
