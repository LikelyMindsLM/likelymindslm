import { Injectable, OnDestroy } from '@angular/core';
import { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';
import { BatchedOps } from '@likelymindslm/lmbase-batched-ops';

@Injectable({
  providedIn: 'root',
})
export class Lmbase implements OnDestroy {
  constructor(private idbAdapter: IdbAdapter) {}

  /**
   * Clientside CRUD occurs in batches, and each batch is treated as an atomic unit.
   * `startNewBatchedOp` provides CRUD operations for a batch, where the operations are treated to be atomic, and
   * occur inside the same `indexeddb` database transaction.
   *
   *
   */ startNewBatchedOp(opsCallback: (op: BatchedOps) => void) {
    opsCallback(new BatchedOps(this.idbAdapter));
  }

  ngOnDestroy() {}
}
