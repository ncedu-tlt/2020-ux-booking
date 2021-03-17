import { Controller, Get } from '@nestjs/common';
import type { Data } from '@booking/models/data.model';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getData(): Data {
    return this.appService.getData();
  }
}
