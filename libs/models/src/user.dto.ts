import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @Length(2, 255)
  @IsNotEmpty()
  user: {
    userId: string;
    username: string;
  };
}
