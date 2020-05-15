import { Transaction } from 'dexie';
import {
  ICollectionsMetadata,
  IDocument,
} from '@likelymindslm/lmbase-shared-types';

import * as Automerge from 'automerge';

/**
 * Contains `upsert` and `delete` operations.
 * Note: `BatchedOps` is not decorated with Angular `@injectable` because we want to instantiate it ourselves ouside of Angular DI
 *
 *
 */ export class BatchedOps {
  private readonly tx: Transaction;
  private readonly collectionsMetaData: Map<string, ICollectionsMetadata>;

  constructor(
    tx: Transaction,
    collectionsMetaData: Map<string, ICollectionsMetadata>
  ) {
    this.tx = tx;
    this.collectionsMetaData = collectionsMetaData;
  }

  /**
   * caller needs to `await` on the promise returned by `upsert`
   *
   * @param collectionName name of the collection
   * @param doc Automerge document
   *
   * @returns `documentID` wrapped in a `Promise`
   */
  upsert<TDoc>(
    collectionName: string,
    doc: Automerge.Doc<TDoc>
  ): Promise<string> {
    return this.tx.table<IDocument, string>('local_cache').put({
      _id: Automerge.getActorId(doc),
      serialized_state: `${Automerge.save(doc)}`,
      metadata: {
        collection_name: collectionName,
        sort_by_prop_value: '',
      },
    });
  }

  // delete(): Promise<void> {}
}
