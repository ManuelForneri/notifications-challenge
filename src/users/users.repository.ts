import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserWithPokemonDto } from './dto';
import { PokemonClient } from 'src/pokemon/pokemon.client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private pokemonClient: PokemonClient,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findById(id: number): Promise<User | null> {
    return this.usersRepository.findOneBy({ id });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOneBy({ email });
  }

  async create(userData: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = this.usersRepository.create({
      ...userData,
      password: hashedPassword,
    });
    try {
      return await this.usersRepository.save(user);
    } catch (error) {
      if (error instanceof QueryFailedError && (error as any).code === '23505') {
        throw new ConflictException(
          'A user with that username or email already exists',
        );
      }
      throw error;
    }
  }

  async update(id: number, userData: Partial<User>): Promise<User | null> {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10);
    }
    await this.usersRepository.update(id, userData);
    return this.findById(id);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.usersRepository.delete(id);
    return result.affected !== 0;
  }
  async findByIdWithPokemons(id: number): Promise<UserWithPokemonDto> {
    let user = await this.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID: ${id} not found`);
    }
    const pokemonsIds = user.pokemonsIds;
    const pokemons =
      await this.pokemonClient.getPokemonDetailsById(pokemonsIds);

    const userWithPokemon = new UserWithPokemonDto({
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
    });
    userWithPokemon.pokemons = pokemons || [];

    return userWithPokemon;
  }
}
