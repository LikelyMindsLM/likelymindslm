import { Module } from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { mongoDB } from '@demo-server-app/config';
import { IMongoAtlasConfigObj } from '@likelymindslm/lmbase-shared-types';
import { DbModule } from '../db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [mongoDB],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const mongoAtlas = configService.get<IMongoAtlasConfigObj>(
          'mongoAtlas'
        );
        const CONNECTION_STRING =
          `mongodb+srv://${mongoAtlas.username}:${mongoAtlas.password}` +
          `@${mongoAtlas.host}/test?retryWrites=true&w=majority`;

        return {
          uri: CONNECTION_STRING,
        };
      },
      inject: [ConfigService],
    }),
    DbModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
