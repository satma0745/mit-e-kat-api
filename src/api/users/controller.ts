import { Controller, Get, Post, Body, Param, Delete, Put, ParseUUIDPipe, Res } from '@nestjs/common'
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger'
import { Response } from 'express'
import { match } from 'ts-pattern'

import {
  UsersService,
  GetUsersRequest,
  GetUserRequest,
  RegisterUserRequest,
  UpdateUserRequest,
  DeleteUserRequest,
} from '@core/services/users'

import { RegisterUserDto, UpdateUserDto, UserDto } from './dtos'

@ApiTags('users')
@Controller('users')
class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ApiOperation({ summary: 'Register new user.' })
  @ApiCreatedResponse({ description: 'User registered successfully.' })
  @ApiBadRequestResponse({ type: String, description: 'Validation errors occurred.' })
  async registerNewUser(@Body() dto: RegisterUserDto, @Res() res: Response) {
    const request = new RegisterUserRequest(dto)
    const response = await this.usersService.registerNewUser(request)

    match(response)
      .with({ success: true }, () => res.sendStatus(201))
      .with({ issue: 'conflict' }, () => res.status(400).json('Username is already taken.'))
      .exhaustive()
  }

  @Get()
  @ApiOperation({ summary: 'Get all users.' })
  @ApiOkResponse({ type: [UserDto], description: 'Users retrieved successfully.' })
  async getAllUsers(@Res() res: Response) {
    const request = new GetUsersRequest()
    const response = await this.usersService.getUsers(request)

    match(response)
      .with({ success: true }, ({ payload: users }) => {
        const dtos = users.map((user) => new UserDto(user))
        res.status(200).json(dtos)
      })
      .exhaustive()
  }

  @Get(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Get user with specified user id.' })
  @ApiOkResponse({ type: UserDto, description: 'User retrieved successfully.' })
  @ApiNotFoundResponse({ description: 'User with specified id was not found.' })
  async getSingleUser(@Param('userId', ParseUUIDPipe) userId: string, @Res() res: Response) {
    const request = new GetUserRequest(userId)
    const response = await this.usersService.getUser(request)

    match(response)
      .with({ success: true }, ({ payload: user }) => {
        const dto = new UserDto(user)
        res.status(200).json(dto)
      })
      .with({ issue: 'not-found' }, () => res.sendStatus(404))
      .exhaustive()
  }

  @Put(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Update user with specified user id.' })
  @ApiOkResponse({ description: 'User updated successfully.' })
  @ApiBadRequestResponse({ type: String, description: 'Validation errors occurred.' })
  @ApiNotFoundResponse({ description: 'User with specified id was not found.' })
  async updateUser(@Param('userId', ParseUUIDPipe) userId: string, @Body() dto: UpdateUserDto, @Res() res: Response) {
    const request = new UpdateUserRequest(userId, dto)
    const response = await this.usersService.updateUser(request)

    match(response)
      .with({ success: true }, () => res.sendStatus(200))
      .with({ issue: 'conflict' }, () => res.status(400).json('Username is already taken.'))
      .with({ issue: 'not-found' }, () => res.sendStatus(404))
      .exhaustive()
  }

  @Delete(':userId')
  @ApiParam({ name: 'userId', type: 'string', format: 'uuid' })
  @ApiOperation({ summary: 'Delete user with specified user id.' })
  @ApiOkResponse({ description: 'User deleted successfully.' })
  @ApiNotFoundResponse({ description: 'User with specified id was not found.' })
  async deleteUser(@Param('userId', ParseUUIDPipe) userId: string, @Res() res: Response) {
    const request = new DeleteUserRequest(userId)
    const response = await this.usersService.deleteUser(request)

    match(response)
      .with({ success: true }, () => res.sendStatus(200))
      .with({ issue: 'not-found' }, () => res.sendStatus(404))
      .exhaustive()
  }
}

export { UsersController }
