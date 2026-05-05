import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column('int', { array: true, default: [] })
  pokemonsIds: number[];

  @Column({ nullable: true })
  favouritePokemon: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
