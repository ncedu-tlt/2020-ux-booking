import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { configuration } from './config/configuration';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      exclude: ['/api*']
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [configuration]
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
