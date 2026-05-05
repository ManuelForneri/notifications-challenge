import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    description: 'The username of the user',
    example: 'Update username',
    required: false,
  })
  @IsOptional()
  @IsString()
  username?: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'update@example.com',
    required: false,
  })
  @IsOptional()
  @IsEmail({}, { message: 'email must be a valid email address' })
  email?: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'Update password',
    required: false,
  })
  @IsOptional()
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @ApiProperty({
    description: 'The favourite pokemon of the user',
    example: 'Pikachu',
    required: false,
  })
  @IsOptional()
  @IsString()
  favouritePokemon?: string;

  @ApiProperty({
    description: 'The pokemons IDs of the user',
    example: [1, 2, 3],
    required: false,
  })
  @IsOptional()
  @IsArray({ message: 'pokemonsIds must be an array' })
  @IsNumber({}, { each: true, message: 'Each pokemon ID must be a number' })
  pokemonsIds?: number[];
}
