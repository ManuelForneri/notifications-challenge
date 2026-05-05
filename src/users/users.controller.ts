import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserWithPokemonDto } from './dto';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'Return a user.',
    type: UserWithPokemonDto,
  })
  async findOne(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<UserWithPokemonDto> {
    return this.usersService.findById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: User,
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'User data (id is not required)',
  })
  async create(@Body() userData: CreateUserDto): Promise<User> {
    return this.usersService.create(userData);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a user by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the user to update',
    example: 1,
  })
  @ApiBody({
    type: UpdateUserDto,
    description: 'User data to update (all fields are optional)',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: User,
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() userData: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(id, userData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user by id' })
  @ApiParam({
    name: 'id',
    type: 'number',
    description: 'The unique identifier of the user to delete',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully deleted.',
    schema: {
      type: 'boolean',
      example: true,
      description: 'Returns true if the user was deleted successfully',
    },
  })
  @ApiResponse({
    status: 404,
    description: 'User not found.',
  })
  async remove(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this.usersService.delete(id);
  }
}
