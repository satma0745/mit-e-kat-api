import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe } from '@nestjs/common'
import { ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger'

import {
  UsersService,
  GetUsersRequest,
  GetUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from '@core/services/users'

import { RegisterUserDto, UpdateUserDto, UserDto } from './users.dtos'

@ApiTags('users')
@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register new user.' })
  @ApiCreatedResponse({ description: 'User registered successfully.' })
  async registerNewUser(@Body() dto: RegisterUserDto) {
    const request = new RegisterUserRequest(dto)
    await this.usersService.registerNewUser(request)
  }

  @Get()
  @ApiOperation({ summary: 'Get all users.' })
  @ApiOkResponse({ type: [UserDto], description: 'Users retrieved successfully.' })
  async getAllUsers() {
    const request = new GetUsersRequest()
    const users = await this.usersService.getUsers(request)
    return users.map((user) => new UserDto(user))
  }

  @Get(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Get user with specified user id.' })
  @ApiOkResponse({ type: UserDto, description: 'User retrieved successfully.' })
  async getSingleUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const request = new GetUserRequest(userId)
    const user = await this.usersService.getUser(request)
    return new UserDto(user)
  }

  @Put(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Update user with specified user id.' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  async updateUser(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: UpdateUserDto) {
    const request = new UpdateUserRequest(userId, dto)
    await this.usersService.updateUser(request)
  }

  @Delete(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Delete user with specified user id.' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    const request = new DeleteUserRequest(userId)
    await this.usersService.deleteUser(request)
  }
}

export { UsersController }
