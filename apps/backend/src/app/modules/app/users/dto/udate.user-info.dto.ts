import { IsEmail, IsNotEmpty, Length } from 'class-validator';

export class UpdateUserInfoDto {
  @Length(2, 255)
  firstName: string;

  @Length(2, 255)
  secondName: string;

  dateOfBirth: string;

  @Length(11, 11)
  phone: string;

  @Length(2, 255)
  nationality: string;

  @Length(1, 32)
  sex: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
