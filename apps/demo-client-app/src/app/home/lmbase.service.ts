import { Injectable } from '@angular/core';
import { Lmbase } from '@likelymindslm/lmbase';

import * as Automerge from 'automerge';

@Injectable({
  providedIn: 'root',
})
export class LmbaseService {
  constructor(private lmbase: Lmbase) {}

  async test() {
    await this.lmbase.init(async (collectionsManager) => {
      await collectionsManager.addNewCollection('users', ['address', 'street']);
    });

    //  /*
    await this.lmbase
      .startNewBatchedOp()
      .executeBatch(
        [
          '3c8335fb-6c6c-4f39-add0-4370606189fc',
          'cd48c74f-ccf2-4c7d-8707-a0a71df4595a',
        ],
        async (batch, [firstDoc, secondDoc]) => {
          console.log(firstDoc, secondDoc);
          await batch.upsert(
            'users',
            Automerge.change<any, any>(
              Automerge.init(),
              'writting new doc',
              (doc) => {
                doc.a = 'bitch';
                doc.address = { street: 25 };
              }
            )
          );
        }
      );

    //   */
  }
}
