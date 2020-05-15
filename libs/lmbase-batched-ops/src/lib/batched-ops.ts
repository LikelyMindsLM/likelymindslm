import type { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';
import { IDocument } from '@likelymindslm/lmbase-shared-types';

/**
 * Clientside CRUD occurs in batches, and each batch is treated as an atomic unit.
 * `BatchedOps` provides CRUD operations for a batch, where the operations are treated to be atomic, and
 * occur inside the same `indexeddb` database transaction.
 *
 * Note: `BatchedOps` is not decorated with Angular `@injectable` because we want to instantiate it ourselves ouside of Angular DI
 *
 *
 */ export class BatchedOps {
  private readonly idbAdapter: IdbAdapter;

  constructor(idbAdapter: IdbAdapter) {
    this.idbAdapter = idbAdapter;
  }

  execute(
    batchedOps: (op: BatchedOps, documentsRead: IDocument[]) => any,
    docIDs?: string[] // Document IDs to read (in the same transaction), before performing the write operations
  ) {}
}
