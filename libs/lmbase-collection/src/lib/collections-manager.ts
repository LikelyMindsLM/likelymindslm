import Dexie, { Transaction } from 'dexie';
import {
  ICollectionsMetadata,
  IDocument,
} from '@likelymindslm/lmbase-shared-types';
import { equals, mergeDeepLeft } from 'ramda';

import * as Automerge from 'automerge';

/**
 * `CollectionsManager` handles schema registration and modification.
 * All operations done inside the `CollectionsManager` are atomic.
 *
 * Every operation that is performed by `CollectionsManager` increments the `_dbVersionNumber` number by one.
 * The client app does not need to track the version number, but they need to meet the condition
 * that the schema file is `append` only, and you cannot change the order, or add/remove previous code,
 * but only append new code at the bottom. This is because there might be users running the older
 * version of the scehma, hence the previous scehma details need to be preserved.
 *
 *
 */ export class CollectionsManager {
  private readonly tx: Transaction;
  private _dbVersionNumber = 0;

  constructor(tx: Transaction) {
    this.tx = tx;
  }

  /**
   * Adds new collection if it doesn't exist. It will ignore if the collection already exists (and the
   * collection metadata is the same), and will fail if you try to add a collection with different
   * metadata than what is currently registered.
   *
   * @param collectionName name of the collection to add
   * @param sortByPropPath The primary field to sort by
   *
   * The value coresponding to `sortByPropPath` will be copied over to the `metadata` object of the document.
   * Indexeddb sorts the documents stored using the value corresponding to this key.
   *
   * For nested paths, provide the keys sequentially in the array, eg: user.name will be ["user","name"]
   * Caller needs to `await` on the `add` operation
   */

  async addNewCollection(
    collectionName: string,
    sortByPropPath: string[]
  ): Promise<void> {
    const maybeExistingCollection = await this.tx
      .table<ICollectionsMetadata, string>('collections_metadata')
      .where({ collection_name: collectionName })
      .first();

    if (maybeExistingCollection) {
      /**
       * Since collection exists we dont need to recreate it. However, since `addNewCollection` was
       * designed only to `add` and not `modify`, we need to verify that the metadata provided
       * matches the registered metadata, and give meaningful error otherwise
       */

      if (!equals(maybeExistingCollection.sort_by_prop_path, sortByPropPath)) {
        throw new Error(`Collection already exists! Are you trying to modify an existing
        collection? If so, use the other methods available in the 'CollectionsManager'`);
      }
      return;
    }

    await this.tx
      .table<ICollectionsMetadata, string>('collections_metadata')
      .add({
        collection_name: collectionName,
        sort_by_prop_path: sortByPropPath,
        migrationDescriptions: [],
      });
  }

  /**
   * @param oldName collection to change the name of
   * @param newName the new name
   *
   *
   */ async changeCollectionName(
    oldName: string,
    newName: string
  ): Promise<void> {
    const maybeNewCollectionExists = await this.tx
      .table<ICollectionsMetadata, string>('collections_metadata')
      .where({ collection_name: newName })
      .first();

    if (maybeNewCollectionExists) {
      throw new Error(`Cannot change the collection name to '${newName}' because a collection
      with this name already exists! Collection names must be unique.`);
    }
  }

  changeSortByProp() {}

  /**
   * Data migration tool: Used when changing the document data structure to add/update/delete fields
   * in all documents belonging to a collection.
   *
   * @param collectionName name of the collection where data migration will occur
   * @param migrationDescription a unique string to identify this particular migration.
   * While `migrationID` can be any unique string like UUIDs etc, (and internally, Lmbase treats it like a unique ID),
   * it is recommended to use `migrationDescription` as an actual description , eg: "Introducing new date field"
   * for readability.
   *
   * NOTE: `migrationDescription` MUST be unique, ie. no two calls to `modifyAllDocumentsInCollection` should have
   * the same `migrationDescription` string ever. You have been warned.
   *
   * @param migrationCallback the callback function that will be called with the current state of the document
   * as the argument, and it must return a new object, which will replace that old document.
   *
   *
   */ async modifyAllDocumentsInCollection<TDoc>(
    collectionName: string,
    migrationDescription: string,
    migrationCallback: (doc: Automerge.Doc<TDoc>) => Automerge.Doc<TDoc>
  ) {
    const maybeExistingCollection = await this.tx
      .table<ICollectionsMetadata, string>('collections_metadata')
      .where({ collection_name: collectionName })
      .first();

    if (!maybeExistingCollection) {
      throw new Error(`Cannot modify any documents because the collection with the name '${collectionName}'
      does not exist! Or it could also be that the indexeddb objectstore 'collections_metadata' has been 
      modified from outside of Lmbase`);
    }

    const migrationPreviouslyDone = maybeExistingCollection.migrationDescriptions.includes(
      migrationDescription
    );

    if (!migrationPreviouslyDone) {
      await this.tx
        .table<IDocument, string>('local_cache')
        .where('[metadata.collection_name+metadata.sort_by_prop_value]')
        .between([collectionName, Dexie.minKey], [collectionName, Dexie.maxKey])
        .modify((oldDocState, ref) => {
          const modifiedDoc = migrationCallback(
            Automerge.load<TDoc>(oldDocState.serialized_state)
          );
          const modifiedDoc_serialized = Automerge.save(modifiedDoc);
          const newStatePartial: Partial<IDocument> = {
            serialized_state: modifiedDoc_serialized,
          };
          ref.value = mergeDeepLeft(newStatePartial, oldDocState);
        });

      await this.tx
        .table<ICollectionsMetadata, string>('collections_metadata')
        .update(collectionName, {
          migrationDescriptions: [
            ...maybeExistingCollection.migrationDescriptions,
            migrationDescription,
          ],
        });
    }
  }

  /**
   * WARNING: will completely delete the collection, and all documents that belong to the collection
   *
   * @param collectionName the collection to delete
   */
  async deleteExistingCollectionAndItsDocs(
    collectionName: string
  ): Promise<void> {
    const maybeExistingCollection = await this.tx
      .table<ICollectionsMetadata, string>('collections_metadata')
      .where({ collection_name: collectionName })
      .first();

    if (maybeExistingCollection) {
      await this.tx
        .table<IDocument, string>('local_cache')
        .where('[metadata.collection_name+metadata.sort_by_prop_value]')
        .between([collectionName, Dexie.minKey], [collectionName, Dexie.maxKey])
        .delete();

      await this.tx
        .table<ICollectionsMetadata, string>('collections_metadata')
        .where({ collection_name: collectionName })
        .delete();
    }
  }
}
