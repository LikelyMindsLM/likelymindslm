import { Injectable, OnDestroy } from '@angular/core';
import { IdbAdapter } from '@likelymindslm/lmbase-idb-adapter';
import {
  BatchedOpsBuilder,
  BatchedOps,
} from '@likelymindslm/lmbase-batched-ops';
import {
  IDocument,
  ICollectionsMetadata,
} from '@likelymindslm/lmbase-shared-types';
import {
  CollectionsManager,
  Collection,
  CollectionsMetadata,
} from '@likelymindslm/lmbase-collection';

@Injectable({
  providedIn: 'root',
})
export class Lmbase implements OnDestroy {
  private isInitialized = false;
  constructor(
    private idbAdapter: IdbAdapter,
    private collectionsMetadata: CollectionsMetadata
  ) {}

  /**
   * Lmbase will automatically `migrate` users of the client app which are using a older
   * version of the schema during initialization.
   *
   * This method initializes `collectionsMetadata` and provides instance of `CollectionsManager`
   * to the `schemaOpsCallback`. The client app will use this instance to perform
   * schema registration and changes.
   *
   * The client app should call `init` from a `schema.ts` file, which should be treated as
   * an `append only` type of file, where new changes are appended to the bottom of the file,
   * and previous entries are never touched once the webapp is in production.
   *
   * Doing this will maintain a `version` system, without explicitly tracking
   * things like version numbers, and migration procedures, etc..
   *
   * Caller needs to `await` on promise returned by `init`
   *
   *
   * @param schemaOpsCallback `init` will provide an instance of `CollectionsManager` to this callback
   *
   *
   *
   */ async init(
    schemaOpsCallback: (op: CollectionsManager) => void
  ): Promise<void> {
    await this.idbAdapter.transaction(
      'readwrite',
      [this.idbAdapter.collections_metadata, this.idbAdapter.local_cache],
      (tx) => {
        schemaOpsCallback(new CollectionsManager(tx));
      }
    );
    await this._collectionsMetadataInit();
    this.isInitialized = true;
  }

  /**
   * Returns a `Collection` instance
   */

  collection(collectionName: string): Collection {
    if (!this.isInitialized) {
      throw new Error(
        `Lmbase not initialized! Please call 'init' and 'await' on that returned promise before proceeding.
        The init() method takes a callback where you need to register you schema`
      );
    }

    return new Collection(collectionName);
  }

  /**
   * Clientside CRUD occurs in batches, and each batch is treated as an atomic unit.
   * `startNewBatchedOp` provides CRUD operations for a batch, where the operations are treated to be atomic, and
   * occur inside the same `indexeddb` database transaction.
   *
   *
   */ startNewBatchedOp() {
    if (!this.isInitialized) {
      throw new Error(
        `Lmbase not initialized! Please call 'init' and 'await' on that returned promise before proceeding.
        The init() method takes a callback where you need to register you schema`
      );
    }
    return new BatchedOpsBuilder(this.idbAdapter, this.collectionsMetadata);
  }

  /**
   * Populates `collectionsMetadata` with values from `collections_metadata` objectstore
   */
  private async _collectionsMetadataInit(): Promise<void> {
    return this.idbAdapter.transaction(
      'readonly',
      this.idbAdapter.collections_metadata,
      (tx) => {
        return tx
          .table<ICollectionsMetadata, string>('collections_metadata')
          .each((collection) => {
            this.collectionsMetadata.upsert(
              collection.collection_name,
              collection
            );
          });
      }
    );
  }

  ngOnDestroy() {}
}
