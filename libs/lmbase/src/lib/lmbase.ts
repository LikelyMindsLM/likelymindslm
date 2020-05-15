import { Injectable, OnDestroy } from '@angular/core';
import { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';
import {
  BatchedOpsBuilder,
  BatchedOps,
} from '@likelymindslm/lmbase-batched-ops';
import { IDocument } from '@likelymindslm/lmbase-shared-types';
import {
  CollectionsManager,
  Collection,
} from '@likelymindslm/lmbase-collection';

export type T<P> = P extends undefined ? number : string;

@Injectable({
  providedIn: 'root',
})
export class Lmbase implements OnDestroy {
  constructor(
    private idbAdapter: IdbAdapter,
    private collectionsManager: CollectionsManager
  ) {}

  /**
   * If collectionName is provided then return that collection
   * else, return `CollectionsManager`
   */

  collection(collectionName: string): Collection;
  collection(): CollectionsManager;
  collection(name?: string) {
    if (name) {
      return new Collection(name);
    } else {
      return this.collectionsManager;
    }
  }

  /**
   * Clientside CRUD occurs in batches, and each batch is treated as an atomic unit.
   * `startNewBatchedOp` provides CRUD operations for a batch, where the operations are treated to be atomic, and
   * occur inside the same `indexeddb` database transaction.
   *
   *
   */ startNewBatchedOp(
    docIDsToRead: string[],
    opsCallback: (ops: BatchedOps, documentsRead: Promise<IDocument[]>) => void
  ) {
    return new BatchedOpsBuilder(docIDsToRead, opsCallback, this.idbAdapter);
  }

  ngOnDestroy() {}
}
