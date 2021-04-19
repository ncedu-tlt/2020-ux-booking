import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from './register.user.dto';
import { Response } from 'express';
import { getManager } from 'typeorm';
import { User } from '../../db/domain/user.dao';

@Controller('users')
export class UserController {
  @Post()
  async register(
    @Res() res: Response,
    @Body() registerUserDto: RegisterUserDto
  ) {
    const entityManager = getManager();
    const user = new User();

    if (!registerUserDto.name) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      res.send('Name required');
    } else if (!registerUserDto.email) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      res.send('Email required');
    } else if (!registerUserDto.password) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      res.send('Password required');
    } else if (await this.selectEmail(registerUserDto, entityManager)) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY);
      res.send('Such user is already registered');
    } else {
      user.firstName = registerUserDto.name;
      user.email = registerUserDto.email;
      user.password = registerUserDto.password;

      const answer = await entityManager
        .save(user)
        .then(() => {
          res.status(HttpStatus.CREATED);
          return 'created';
        })
        .catch(error => {
          console.log('error');
          res.status(HttpStatus.UNPROCESSABLE_ENTITY);
          return error;
        });
      res.send(answer);
    }
  }

  async selectEmail(registerUserDto, entityManager): Promise<boolean> {
    const res = await entityManager
      .createQueryBuilder()
      .select()
      .from(User, 'user')
      .where('user.email = :email', { email: registerUserDto.email })
      .getCount();
    return res != 0;
  }
}
