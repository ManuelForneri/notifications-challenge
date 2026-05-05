import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/user.entity';
import { PokemonDetail } from '../../pokemon/pokemon.client';

export class UserWithPokemonDto extends User {
  @ApiProperty({
    description: 'The unique identifier of the user',
    example: 1,
  })
  declare id: number;

  @ApiProperty({
    description: 'The username of the user',
    example: 'manuel',
  })
  declare username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'manuel@example.com',
  })
  declare email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'hashedPassword123',
  })
  declare password: string;

  @ApiProperty({
    description: 'The favourite pokemon of the user',
    example: 'Pikachu',
    required: false,
  })
  declare favouritePokemon: string;

  @ApiHideProperty()
  declare pokemonsIds: number[];

  @ApiProperty({
    description: 'The pokemons of the user with their details',
    type: 'array',
    items: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        name: { type: 'string', example: 'bulbasaur' },
      },
    },
    example: [
      { id: 1, name: 'bulbasaur' },
      { id: 4, name: 'charmander' },
      { id: 7, name: 'squirtle' },
    ],
  })
  pokemons: PokemonDetail[];
}
