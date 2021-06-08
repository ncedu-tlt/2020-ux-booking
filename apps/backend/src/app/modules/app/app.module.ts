import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { appConfig } from '../../config/app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessagesModule } from '../messages/messages.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from '../hotels-list/hotels.module';

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
    MessagesModule,
    UsersModule,
    AuthModule,
    HotelsModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
