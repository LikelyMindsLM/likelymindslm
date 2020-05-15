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
    ops: (op: BatchedOps, documentsRead: Promise<IDocument[]>) => void,
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

  /**
   *
   * @param docIDsToRead Document IDs to read (in the same transaction), before performing the write operations
   * @param ops
   * @param tx
   * @param collectionsMetaData
   *
   * Error at any point will rollback the `indexeddb` objectstores
   */
  execute(
    docIDsToRead: string[],
    ops: (op: BatchedOps, documentsRead: Promise<IDocument[]>) => void,
    tx: Transaction,
    collectionsMetaData: Map<string, ICollectionsMetadata>
  ) {
    const documentsRead = tx
      .table<IDocument, string>('local_cache')
      .bulkGet(docIDsToRead);
    ops(new BatchedOps(tx, collectionsMetaData), documentsRead);
  }
}
