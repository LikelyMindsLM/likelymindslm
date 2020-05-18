import type { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';
import { IDocument } from '@likelymindslm/lmbase-shared-types';
import { BatchedOps } from './batched-ops';
import { Transaction } from 'dexie';
import { CollectionsMetadata } from '@likelymindslm/lmbase-collection';

import * as Automerge from 'automerge';

/**
 * Clientside CRUD occurs in batches, and each batch is treated as an atomic unit.
 * `BatchedOpsBuilder` provides CRUD operations for a batch, where the operations are treated to be atomic, and
 * occur inside the same `indexeddb` database transaction.
 *
 * Note: `BatchedOpsBuilder` is not decorated with Angular `@injectable` because we want to instantiate it ourselves ouside of Angular DI
 *
 *
 */ export class BatchedOpsBuilder {
  private readonly idbAdapter: IdbAdapter;
  private readonly collectionsMetadata: CollectionsMetadata;

  constructor(
    idbAdapter: IdbAdapter,
    collectionsMetadata: CollectionsMetadata
  ) {
    this.idbAdapter = idbAdapter;
    this.collectionsMetadata = collectionsMetadata;
  }

  /**
   * @param docIDsToRead Document IDs to read (in the same transaction), before performing the write operations
   * @param ops BatchedOps
   *
   * Caller must `await` on the returned promise
   *
   *
   */ async executeBatch(
    docIDsToRead: string[],
    ops: (op: BatchedOps, documentsRead: Automerge.Doc<unknown>[]) => void
  ) {
    await this.idbAdapter.transaction(
      'readwrite',
      [this.idbAdapter.local_cache, this.idbAdapter.intercom],
      async (tx) => {
        await this.execute(docIDsToRead, ops, tx, this.collectionsMetadata);
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
  private async execute(
    docIDsToRead: string[],
    ops: (op: BatchedOps, documentsRead: Automerge.Doc<unknown>[]) => void,
    tx: Transaction,
    collectionsMetadata: CollectionsMetadata
  ) {
    const _documentsRead = await tx
      .table<IDocument, string>('local_cache')
      .bulkGet(docIDsToRead);

    const documentsRead =
      _documentsRead && _documentsRead.length && _documentsRead[0]
        ? _documentsRead.map((docs) => {
            return Automerge.load(docs.serialized_state);
          })
        : _documentsRead;
    ops(new BatchedOps(tx, collectionsMetadata), documentsRead);
  }
}
