import { Injectable } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class DbService {
  constructor(@InjectConnection() private connection: Connection) {
    this.connection
      .useDb('lminds')
      .collection('users')
      .find()
      .forEach((x) => {
        console.log(x);
      });
  }
}
