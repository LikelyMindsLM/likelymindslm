import type { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';
import {
  IDocument,
  ICollectionsMetadata,
} from '@likelymindslm/lmbase-shared-types';
import { BatchedOps } from './batched-ops';
import { Transaction } from 'dexie';

/**
 * Clientside CRUD occurs in batches, and each batch is treated as an atomic unit.
 * `BatchedOpsBuilder` provides CRUD operations for a batch, where the operations are treated to be atomic, and
 * occur inside the same `indexeddb` database transaction.
 *
 * Note: `BatchedOpsBuilder` is not decorated with Angular `@injectable` because we want to instantiate it ourselves ouside of Angular DI
 *
 *
 */ export class BatchedOpsBuilder {
  constructor(
    docIDsToRead: string[],
    ops: (op: BatchedOps, documentsRead: IDocument[]) => void,
    idbAdapter: IdbAdapter
  ) {
    idbAdapter.transaction(
      'readwrite',
      [idbAdapter.local_cache, idbAdapter.intercom],
      (tx) => {
        this.execute(docIDsToRead, ops, tx, idbAdapter.collectionsMetaData);
      }
    );
  }

  execute(
    docIDsToRead: string[], // Document IDs to read (in the same transaction), before performing the write operations
    ops: (op: BatchedOps, documentsRead: IDocument[]) => void,
    tx: Transaction,
    collectionsMetaData: Map<string, ICollectionsMetadata>
  ) {
    /**
     * @todo read docs first
     */
    ops(new BatchedOps(tx, collectionsMetaData), []);
  }
}
