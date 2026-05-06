import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) { }

  async findAll(): Promise<User[]> {
    return this.usersRepository.findAll();
  }
  async findById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    return user;
  }
  async findByEmail(email: string): Promise<UserDto | null> {
    return this.usersRepository.findByEmail(email);
  }
  async create(userData: CreateUserDto): Promise<UserDto> {
    return this.usersRepository.create(userData);
  }
  async update(id: number, userData: Partial<User>): Promise<UserDto> {
    const updatedUser = await this.usersRepository.update(id, userData);
    if (!updatedUser) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    return updatedUser;
  }
  async delete(id: number): Promise<boolean> {
    return this.usersRepository.delete(id);
  }
}
