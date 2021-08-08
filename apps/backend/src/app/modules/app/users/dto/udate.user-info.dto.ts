import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class UpdateUserInfoDto {
  @Length(2, 255)
  firstName: string;

  @IsOptional()
  @Length(2, 255)
  lastName: string;

  @IsOptional()
  dateOfBirth: string;

  @IsOptional()
  @Length(11, 11)
  phone: string;

  @IsOptional()
  @Length(2, 255)
  nationality: string;

  @IsOptional()
  @Length(1, 32)
  gender: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;
}
