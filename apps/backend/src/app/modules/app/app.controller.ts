import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import type { Data } from '@booking/models/data.model';
import { AppService } from './app.service';
import { Response } from 'express';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserDto } from '@booking/models/user.dto';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
  ) {}

  @Get()
  getData(): Data {
    return this.appService.getData();
  }

  @UseGuards(LocalAuthGuard)
  @Post('/auth/login')
  async login(@Res() res: Response, @Request() req) {
    const token = await this.authService.login(req.user);
    if (!token) {
      res.status(HttpStatus.UNAUTHORIZED);
      return res.json({
        code: 'error_token',
        message: 'Error during token generation'
      });
    }
    return res.send(token);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/auth/current')
  getCurrentUser(@Request() req): UserDto {
    const user = req.user;
    if (!user) {
      throw new HttpException('users/userDoesNotExist', HttpStatus.NOT_FOUND);
    }
    return {
      user: user
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
