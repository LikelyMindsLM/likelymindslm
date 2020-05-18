import { Module } from '@nestjs/common';

import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';

const uri =
  'mongodb+srv://mongooseConnect:<password>@lminds-v1ylg.azure.mongodb.net/test?retryWrites=true&w=majority';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
