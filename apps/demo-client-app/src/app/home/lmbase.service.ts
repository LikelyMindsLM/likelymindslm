import { Injectable } from '@angular/core';
import { Lmbase } from '@likelymindslm/lmbase';

import * as Automerge from 'automerge';

@Injectable({
  providedIn: 'root',
})
export class LmbaseService {
  constructor(private lmbase: Lmbase) {}

  test() {
    this.lmbase.startNewBatchedOp(
      ['54e5c9ad-b855-404d-b432-4d4bab021906'],
      async (batch, documentsRead) => {
        (await documentsRead).forEach((doc) => {
          console.log(doc);
        });

        await batch.upsert(
          'test',
          Automerge.change<any, any>(
            Automerge.init(),
            'reading and writting',
            (doc) => {
              doc.a = '(await documentsRead)[0]._id;';
            }
          )
        );
      }
    );

    let p = this.lmbase.collection();
  }
}
