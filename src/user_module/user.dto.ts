import { IsString, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(9)
  password: string;
}

export class UserDTO {
  id: Number;
  email: string;
}
