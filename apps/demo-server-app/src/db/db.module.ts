import { Module } from '@nestjs/common';
import { DbService } from './db.service';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature()],
  providers: [DbService],
})
export class DbModule {}
