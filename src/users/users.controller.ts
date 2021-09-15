import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

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
  async registerNewUser(@Body() createUserDto: RegisterUserDto) {
    await this.usersService.registerNewUser(createUserDto)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users.' })
  @ApiOkResponse({ type: [UserDto], description: 'Users retrieved successfully.' })
  async getAllUsers() {
    const users = await this.usersService.getAllUsers()
    return users.map((user) => new UserDto(user))
  }

  @Get(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Get user with specified user id.' })
  @ApiOkResponse({ type: UserDto, description: 'User retrieved successfully.' })
  async getSingleUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const user = await this.usersService.getSingleUser(userId)
    return new UserDto(user)
  }

  @Put(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Update user with specified user id.' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  async updateUser(@Param('userId', ParseUUIDPipe) userId: string, @Body() updateUserDto: UpdateUserDto) {
    await this.usersService.updateUser(userId, updateUserDto)
  }

  @Delete(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Delete user with specified user id.' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.usersService.deleteUser(userId)
  }
}

export { UsersController }
