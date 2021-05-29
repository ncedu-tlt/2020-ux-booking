import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class RegisterUserDto {
  @Length(2, 255)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Length(8, 255)
  @IsNotEmpty()
  password: string;
}
