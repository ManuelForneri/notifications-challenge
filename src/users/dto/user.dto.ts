import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class UserDto {
    @ApiProperty({ description: 'The username of the user', example: 'john_doe' })
    @IsString()
    @IsNotEmpty({ message: 'Username must not be empty' })
    username: string;

    @ApiProperty({
        description: 'The password of the user',
        example: 'password',
    })
    @IsString()
    @IsNotEmpty({ message: 'Password must not be empty' })
    password: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'john@example.com',
    })
    @IsEmail({}, { message: 'email must be a valid email address' })
    @IsNotEmpty({ message: 'Email must not be empty' })
    email: string;
}
