import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from '../../config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from '../messages/messages.module';
import { UserController } from './users/user.controller';
import { UserService } from './users/user.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'frontend'),
      exclude: ['/api*']
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      load: [appConfig]
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('db.url'),
        synchronize: true,
        autoLoadEntities: true,
        logging: false,
        ssl: configService.get<boolean>('production') && {
          rejectUnauthorized: false
        }
      })
    }),
    MessagesModule
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService]
})
export class AppModule {}
