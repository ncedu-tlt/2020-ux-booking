import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppConfig } from './config/configuration';

@Injectable()
export class AppService {
  constructor(private configService: ConfigService<AppConfig>) {}

  getData(): { message: string } {
    return { message: this.configService.get('test') };
  }
}
