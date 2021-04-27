import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { RegisterUserDto } from './register.user.dto';
import { Response } from 'express';
import { getRepository } from 'typeorm';
import { User } from '../../db/domain/user.dao';
import * as bcrypt from 'bcrypt';
import { Role } from '../../db/domain/role.dao';

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

    const roles = [await getRepository(Role).findOne({ name: 'admin' })];
    const user = new User();
    user.firstName = registerUserDto.name;
    user.password = await bcrypt.hash(registerUserDto.password, 10);
    user.email = registerUserDto.email;
    user.roles = roles;

    const answer = await userRepository
      .save(user)
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
