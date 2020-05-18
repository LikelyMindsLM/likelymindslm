import { Transaction } from 'dexie';
import { IDocument } from '@likelymindslm/lmbase-shared-types';

import * as Automerge from 'automerge';
import { CollectionsMetadata } from '@likelymindslm/lmbase-collection';

import { lensPath, view } from 'ramda';

/**
 * Contains `upsert` and `delete` operations.
 * Note: `BatchedOps` is not decorated with Angular `@injectable` because we want to instantiate it ourselves ouside of Angular DI
 *
 *
 */ export class BatchedOps {
  private readonly tx: Transaction;
  private readonly collectionsMetadata: CollectionsMetadata;

  constructor(tx: Transaction, collectionsMetadata: CollectionsMetadata) {
    this.tx = tx;
    this.collectionsMetadata = collectionsMetadata;
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
    const sortByPropPath = this.collectionsMetadata.getSortByPropPath(
      collectionName
    );

    const sortByPropLens = lensPath(sortByPropPath);
    const sortByPropValue = view(sortByPropLens, doc);

    if (!sortByPropValue) {
      throw new Error(
        `The document must contain a defined value at the path: '${sortByPropPath.join(
          '.'
        )}'. This path was registered when you added the collection, and it is used for proper paginated live-queries`
      );
    }

    return this.tx.table<IDocument, string>('local_cache').put({
      _id: Automerge.getActorId(doc),
      serialized_state: `${Automerge.save(doc)}`,
      metadata: {
        collection_name: collectionName,
        sort_by_prop_value: sortByPropValue as string,
      },
    });
  }

  // delete(): Promise<void> {}
}
