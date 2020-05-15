import { Injectable } from '@angular/core';
import { Lmbase } from '@likelymindslm/lmbase';

import * as Automerge from 'automerge';

@Injectable({
  providedIn: 'root',
})
export class LmbaseService {
  constructor(private lmbase: Lmbase) {}

  async test() {
    this.lmbase.startNewBatchedOp([], (ops, documentsRead) => {
      console.log(documentsRead);
      ops.upsert('test', Automerge.init());
    });
  }
}
