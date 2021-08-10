import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  id: string;

  @Length(2, 255)
  @IsNotEmpty()
  userName: string;

  @Length(2, 255)
  @IsNotEmpty()
  phoneNumber: string;
}
