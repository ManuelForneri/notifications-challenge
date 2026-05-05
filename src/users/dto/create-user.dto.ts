import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
  @IsString()
  @IsNotEmpty({ message: 'Username must not be empty' })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john@example.com',
  })
  @IsEmail({}, { message: 'email must be a valid email address' })
  @IsNotEmpty({ message: 'Email must not be empty' })
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'securepassword',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password must not be empty' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

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
    example: [1, 4, 7],
  })
  @IsArray({ message: 'pokemonsIds must be an array' })
  @IsNumber({}, { each: true, message: 'Each pokemon ID must be a number' })
  pokemonsIds: number[];
}
