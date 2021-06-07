import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register.user.dto';
import { Response } from 'express';
import { Repository } from 'typeorm';
import { User } from '../../db/domain/user.dao';
import * as bcrypt from 'bcrypt';
import { Role } from '../../db/domain/role.dao';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateUserInfoDto } from './dto/update.user-info.dto';

@Controller('/users')
export class UserController {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

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

  @Get(':id')
  async getUser(@Param('id') id): Promise<User> {
    console.log('Get user: ' + id);
    // TODO remove password
    return this.usersRepository.findOne({ id: id });
  }

  @Patch(':id')
  async updateUser(@Param('id') id, @Body() updateUserInfo: UpdateUserInfoDto) {
    await this.usersRepository.update({ id: id }, updateUserInfo);
  }

  private async isValidEmail(email): Promise<boolean> {
    const countUsers = await this.usersRepository.count({ email: email });
    return countUsers == 0;
  }
}
