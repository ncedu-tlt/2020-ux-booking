import { IsNotEmpty, Length } from 'class-validator';

export class UserDto {
  @Length(2, 255)
  @IsNotEmpty()
  user: {
    username: string;
  };
}
