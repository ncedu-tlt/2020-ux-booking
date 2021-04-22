import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from './register.user.dto';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../db/domain/user.dao';

@Controller('users')
export class UserController {
  @Post()
  async register(
    @Res() res: Response,
    @Body() registerUserDto: RegisterUserDto
  ) {
    const userRepository = getRepository(User);
    if (!(await this.isValidEmail(registerUserDto.email, userRepository))) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      return res.send('Such user is already registered');
    }

    const answer = await userRepository
      .insert({
        firstName: registerUserDto.name,
        password: registerUserDto.password,
        email: registerUserDto.email
      })
      .then(() => {
        res.status(HttpStatus.CREATED);
        return;
      })
      .catch(error => {
        res.status(HttpStatus.UNPROCESSABLE_ENTITY);
        return error;
      });
    res.send(answer);
  }

  async isValidEmail(email, userRepository): Promise<boolean> {
    return (await userRepository.count({ email: email })) == 0;
  }
}
