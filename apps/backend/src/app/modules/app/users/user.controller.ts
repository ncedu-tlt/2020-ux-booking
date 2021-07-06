import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
  UseGuards,
  Request
} from '@nestjs/common';
import { RegisterUserDto } from '@booking/models/register.user.dto';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../db/domain/user.dao';
import * as bcrypt from 'bcrypt';
import { Role } from '../../db/domain/role.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@booking/models/user.dto';

@Controller('/users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/current')
  getCurrentUser(@Request() req): UserDto {
    const user = req.user;
    if (!user) {
      throw new HttpException('users/userDoesNotExist', HttpStatus.NOT_FOUND);
    }
    return {
      user: user
    };
  }

  @Post()
  async register(
    @Res() res: Response,
    @Body() registerUserDto: RegisterUserDto
  ) {
    if (!(await this.isValidEmail(registerUserDto.email))) {
      res.status(HttpStatus.CONFLICT);
      return res.json({
        code: 'already_exists',
        message: 'Such user is already registered'
      });
    }

    const roles = [await this.rolesRepository.findOne({ name: 'user' })];
    const user = new User();
    user.firstName = registerUserDto.name;
    user.password = await bcrypt.hash(registerUserDto.password, 10);
    user.email = registerUserDto.email;
    user.roles = roles;

    const answer = await this.usersRepository
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

  private async isValidEmail(email): Promise<boolean> {
    const countUsers = await this.usersRepository.count({ email: email });
    return countUsers == 0;
  }
}
