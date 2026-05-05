import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UsersRepository } from './users.repository';
import { UsersController } from './users.controller';
import { PokemonClient } from 'src/pokemon/pokemon.client';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository, PokemonClient],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
