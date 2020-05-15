import { Injectable, OnDestroy } from '@angular/core';
import { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';
import {
  BatchedOpsBuilder,
  BatchedOps,
} from '@likelymindslm/lmbase-batched-ops';
import { IDocument } from '@likelymindslm/lmbase-shared-types';

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
   */ startNewBatchedOp(
    docIDsToRead: string[],
    opsCallback: (ops: BatchedOps, documentsRead: IDocument[]) => void
  ) {
    return new BatchedOpsBuilder(docIDsToRead, opsCallback, this.idbAdapter);
  }

  ngOnDestroy() {}
}
