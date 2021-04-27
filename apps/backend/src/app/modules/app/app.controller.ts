import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import type { Data } from '@booking/models/data.model';
import { AppService } from './app.service';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { Roles } from './auth/decorators/role.decorator';
import { DefRole } from './auth/role.enum';
import { RolesGuard } from './auth/roles.guard';

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
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Get('is/admin')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(DefRole.admin)
  isAdmin() {
    return true;
  }

  @Get('is/user')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(DefRole.user)
  isUser() {
    return true;
  }
}
