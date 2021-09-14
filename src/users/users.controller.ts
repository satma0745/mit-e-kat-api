import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, Put } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger'

import { UsersService } from './users.service'
import { RegisterUserDto } from './dto/register-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserDto } from './dto/user.dto'

@ApiTags('users')
@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register new user.' })
  @ApiCreatedResponse({ description: 'User registered successfully.' })
  registerNewUser(@Body() createUserDto: RegisterUserDto) {
    this.usersService.registerNewUser(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users.' })
  @ApiOkResponse({ type: [UserDto], description: 'Users retrieved successfully.' })
  getAllUsers() {
    const users = this.usersService.getAllUsers()
    return users.map((user) => new UserDto(user))
  }

  @Get(':userId')
  @ApiOperation({ summary: 'Get user with specified user id.' })
  @ApiOkResponse({ type: UserDto, description: 'User retrieved successfully.' })
  getSingleUser(@Param('userId', ParseIntPipe) userId: number) {
    const user = this.usersService.getSingleUser(userId)
    return new UserDto(user)
  }

  @Put(':userId')
  @ApiOperation({ summary: 'Update user with specified user id.' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  updateUser(@Param('userId', ParseIntPipe) userId: number, @Body() updateUserDto: UpdateUserDto) {
    this.usersService.updateUser(userId, updateUserDto)
  }

  @Delete(':userId')
  @ApiOperation({ summary: 'Delete user with specified user id.' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  deleteUser(@Param('userId', ParseIntPipe) userId: number) {
    this.usersService.deleteUser(userId)
  }
}

export { UsersController }
