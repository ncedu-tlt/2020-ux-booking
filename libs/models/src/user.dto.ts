import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @Length(2, 255)
  @IsNotEmpty()
  user: {
    id: string;
    username: string;
    phoneNumber: string;
  };
}
